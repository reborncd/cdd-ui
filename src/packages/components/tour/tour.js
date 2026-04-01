export default class UserGuide extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({  mode: "open" });

    // 默认值初始化
    this._targetSelector = "";
    this._message = "";
    this._buttonText = "Got it";
    this._storageKey = "user-guide-shown";
    this._bgColor = "#3e54ad";
    this._position = "auto";
    this._scrollOffset = 0;
    this._scrollTimeout = 2000;
    this._originalBodyStyle = "";

    // 新增：回调函数和状态管理
    this._onCompleteCallback = null;
    this._isActive = false;
    this._targetElement = null;

    // 新增：用于位置跟踪的变量
    this._popupElement = null;
    this._resizeObserver = null;
    this._mutationObserver = null;
    this._scrollHandler = null;
    this._lastTargetRect = null;
    this._updatePositionTimeout = null;

    // 新增：裁剪相关
    this._highlightOverlay = null;
    this._highlightStyleElement = null;

    // 新增：按钮点击事件处理函数引用
    this._confirmButtonHandler = null;

    // 新增：实例标识符，避免多个实例冲突
    this._instanceId = Math.random().toString(36).substr(2,  9);

    // 新增：环境变量
    this._env = {
      // 安全的文档引用
      get document() {
        return document;
      },
      // 安全的窗口引用
      get window() {
        return window;
      },
      // 安全的根元素（在iframe中使用iframe的document，否则使用主document）
      get rootDocument() {
        return document;
      },
      // 安全的根body元素
      get rootBody() {
        return document.body;
      },
      // 安全的存储（在iframe中使用iframe的localStorage）
      get storage() {
        try {
          return localStorage;
        } catch (e) {
          // 如果无法访问localStorage，使用内存存储
          console.warn(" 无法访问localStorage，使用内存存储");
          return this._memoryStorage;
        }
      },
      // 内存存储后备
      _memoryStorage: {
        _data: {},
        getItem(key) {
          return this._data[key] || null;
        },
        setItem(key, value) {
          this._data[key] = value;
        },
        removeItem(key) {
          delete this._data[key];
        }
      }
    };
  }

  static get observedAttributes() {
    return [
      "target",
      "message",
      "button-text",
      "storage-key",
      "bg-color",
      "position",
      "scroll-offset",
      "scroll-timeout",
    ];
  }

  connectedCallback() {
    this._setupAttributes();
  }

  // 新增：启动指引方法
  start() {
    if (this._isActive) {
      console.warn("UserGuide  已经处于活动状态");
      return false;
    }

    // 先清理可能残留的状态
    this._cleanup();

    if (!this._shouldShow()) {
      this._invokeCallback(false);
      return false;
    }

    this._render();
    const targetEl = this._env.rootDocument.querySelector(this._targetSelector);
    if (!targetEl) {
      console.error(" 目标元素未找到:", this._targetSelector);
      this._invokeCallback(false, new Error("目标元素未找到"));
      return false;
    }

    this._targetElement = targetEl;
    this._isActive = true;

    // 确保没有其他用户指引正在运行
    this._ensureSingleInstance();

    this._highlightTarget(targetEl);
    this._ensureElementVisible(targetEl);
    this._lockPageScroll();
    this._showPopup(targetEl);

    // 新增：开始监听目标元素位置变化
    this._startPositionTracking();

    return true;
  }

  // 新增：确保单实例运行
  _ensureSingleInstance() {
    // 清理其他可能存在的指引实例的残留元素
    const existingOverlays = this._env.rootDocument.querySelectorAll('.guide-cutout-overlay');
    existingOverlays.forEach(overlay  => {
      if (!overlay.classList.contains(`instance-${this._instanceId}`))  {
        overlay.remove();
      }
    });

    const existingPopups = this._env.rootDocument.querySelectorAll('.guide-popup');
    existingPopups.forEach(popup  => {
      if (!popup.classList.contains(`instance-${this._instanceId}`))  {
        popup.remove();
      }
    });

    // 清理其他实例的样式
    const existingStyles = this._env.rootDocument.querySelectorAll('style[data-guide-style]');
    existingStyles.forEach(style  => {
      if (!style.hasAttribute(`data-instance-${this._instanceId}`))  {
        style.remove();
      }
    });
  }

  // 新增：关闭指引方法
  close() {
    if (!this._isActive) {
      console.warn("UserGuide  未处于活动状态");
      return false;
    }

    this._completeGuide(false);
    return true;
  }

  // 新增：设置回调函数
  setOnComplete(callback) {
    this._onCompleteCallback = callback;
  }

  // 新增：检查是否处于活动状态
  isActive() {
    return this._isActive;
  }

  // 新增：重置存储状态（允许再次显示）
  reset() {
    this._env.storage.removeItem(this._storageKey);
    console.log("UserGuide  状态已重置，下次可以再次显示");
  }

  _lockPageScroll() {
    const body = this._env.rootBody;
    // 只在没有其他实例锁定滚动时才锁定
    if (!body.hasAttribute('data-guide-scroll-locked'))  {
      this._originalBodyStyle = body.style.cssText;
      body.style.overflow  = "hidden";
      body.style.position  = "fixed";
      body.style.width  = "100%";
      body.style.height  = "100%";
      body.setAttribute('data-guide-scroll-locked',  'true');
    }
  }

  _unlockPageScroll() {
    const body = this._env.rootBody;
    // 只有当当前实例是最后一个活动实例时才解锁滚动
    const activeGuides = this._env.rootDocument.querySelectorAll('user-guide[active]');
    if (activeGuides.length  <= 1) {
      body.style.cssText  = this._originalBodyStyle;
      body.removeAttribute('data-guide-scroll-locked');
    }
  }

  _ensureElementVisible(targetEl) {
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }

  _showPopup(targetEl) {
    this._createPopupInBody(targetEl);
  }

  _createPopupInBody(targetEl) {
    let bgColor = this._bgColor;
    if (bgColor.startsWith("#"))  {
      const hex = bgColor.replace("#",  "");
      const r = parseInt(hex.substring(0,  2), 16);
      const g = parseInt(hex.substring(2,  4), 16);
      const b = parseInt(hex.substring(4,  6), 16);
      bgColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
    }

    const popup = this._env.rootDocument.createElement("div");
    popup.className  = `guide-popup instance-${this._instanceId}`;
    popup.innerHTML  = `
      <div class="guide-message">${this._message}</div>
      <button class="confirm-btn">${this._buttonText}</button>
    `;

    // 设置弹窗样式
    popup.style.cssText  = `
      position: fixed;
      background: ${bgColor};
      max-width: 380px;
      z-index: 2147483647;
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events: auto;
      color: white;
      min-width: 219px;
      min-height: 86px;
      padding: 12px;
      box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
    `;

    this._popupElement = popup;
    this._env.rootBody.appendChild(popup);

    // 添加弹窗样式
    this._addPopupStyles(bgColor);

    setTimeout(() => {
      popup.classList.add("visible");
    }, 50);

    // 保存事件处理函数引用，以便后续移除
    this._confirmButtonHandler = () => {
      this._completeGuide(true);
    };

    // 确认按钮事件
    const confirmBtn = popup.querySelector(".confirm-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click",  this._confirmButtonHandler);
    }

    this._positionPopup(popup, targetEl);
  }

  _addPopupStyles(bgColor) {
    const doc = this._env.rootDocument;

    // 先清理可能存在的旧样式
    const existingStyles = doc.querySelectorAll(`style[data-guide-style="popup"]`);
    existingStyles.forEach(style  => {
      if (!style.hasAttribute(`data-instance-${this._instanceId}`))  {
        style.remove();
      }
    });

    const style = doc.createElement("style");
    style.setAttribute("data-guide-style",  "popup");
    style.setAttribute(`data-instance-${this._instanceId}`,  "true");
    style.textContent  = `
      .guide-popup.instance-${this._instanceId}.visible  {
        transform: translateY(0) scale(1) !important;
        opacity: 1 !important;
      }

      .guide-popup.instance-${this._instanceId}::before  {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 14px solid transparent;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2147483647;
      }

      .guide-popup.instance-${this._instanceId}.bottom::before  {
        top: -14px;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-color: ${bgColor};
        border-top-width: 0;
        opacity: 1;
      }

      .guide-popup.instance-${this._instanceId}.top::before  {
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: ${bgColor};
        border-bottom-width: 0;
        opacity: 1;
      }

      .guide-popup.instance-${this._instanceId}.left::before  {
        right: -14px;
        top: 50%;
        transform: translateY(-50%);
        border-left-color: ${bgColor};
        border-right-width: 0;
        opacity: 1;
      }

      .guide-popup.instance-${this._instanceId}.right::before  {
        left: -14px;
        top: 50%;
        transform: translateY(-50%);
        border-right-color: ${bgColor};
        border-left-width: 0;
        opacity: 1;
      }

      .guide-popup.instance-${this._instanceId}  .guide-message {
        margin-bottom: 20px;
        font-size: 18px;
        line-height: 1.6;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }

      .guide-popup.instance-${this._instanceId}  .confirm-btn {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border-radius: 4px;
        color: #3e54ad;
        background: #ffffff;
        font-size: 14px;
        border: .05rem solid #fff;
        transition: all 0.3s ease;
        cursor: pointer;
        float: right;
      }

      .guide-popup.instance-${this._instanceId}  .confirm-btn:hover {
        background: #f8f9fa;
      }

      .guide-popup.instance-${this._instanceId}  .confirm-btn:active {
        transform: translateY(1px);
      }
    `;
    doc.head.appendChild(style);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "target":
        this._targetSelector = newValue;
        break;
      case "message":
        this._message = newValue;
        break;
      case "button-text":
        this._buttonText = newValue;
        break;
      case "storage-key":
        this._storageKey = newValue;
        break;
      case "bg-color":
        this._bgColor = newValue;
        break;
      case "position":
        this._position = newValue;
        break;
      case "scroll-offset":
        this._scrollOffset = parseInt(newValue) || 0;
        break;
      case "scroll-timeout":
        this._scrollTimeout = parseInt(newValue) || 2000;
        break;
    }
  }

  _setupAttributes() {
    this._targetSelector = this.getAttribute("target")  || this._targetSelector;
    this._message = this.getAttribute("message")  || this._message;
    this._buttonText = this.getAttribute("button-text")  || this._buttonText;
    this._storageKey = this.getAttribute("storage-key")  || this._storageKey;
    this._bgColor = this.getAttribute("bg-color")  || "#3e54ad";
    this._position = this.getAttribute("position")  || "auto";
    this._scrollOffset = parseInt(this.getAttribute("scroll-offset"))  || 0;
    this._scrollTimeout = parseInt(this.getAttribute("scroll-timeout"))  || 2000;
  }

  _shouldShow() {
    return !this._env.storage.getItem(this._storageKey);
  }

  _render() {
    this.shadowRoot.innerHTML  = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 2147483646;
          pointer-events: none;
        }
      </style>
    `;
  }

  _highlightTarget(targetEl) {
    if (!targetEl) return;

    // 先清理可能存在的旧遮罩层
    this._cleanupHighlight();

    // 创建裁剪遮罩层
    this._createCutoutOverlay(targetEl);
  }

  _cleanupHighlight() {
    if (this._highlightOverlay && this._highlightOverlay.parentNode)  {
      this._highlightOverlay.parentNode.removeChild(this._highlightOverlay);
      this._highlightOverlay = null;
    }

    if (this._highlightStyleElement && this._highlightStyleElement.parentNode)  {
      this._highlightStyleElement.parentNode.removeChild(this._highlightStyleElement);
      this._highlightStyleElement = null;
    }
  }

  _createCutoutOverlay(targetEl) {
    const doc = this._env.rootDocument;

    // 创建独立的裁剪遮罩层
    this._highlightOverlay = doc.createElement("div");
    this._highlightOverlay.className  = `guide-cutout-overlay instance-${this._instanceId}`;

    // 关键样式：使用clip-path裁剪出透明区域
    this._highlightOverlay.style.cssText  = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: rgba(0, 0, 0, 0.7) !important;
      pointer-events: none !important;
      z-index: 2147483645 !important;
    `;

    // 添加到body
    doc.body.appendChild(this._highlightOverlay);

    // 创建样式元素用于动态更新裁剪区域
    this._highlightStyleElement = doc.createElement("style");
    this._highlightStyleElement.setAttribute("data-guide-style",  "cutout");
    this._highlightStyleElement.setAttribute(`data-instance-${this._instanceId}`,  "true");
    doc.head.appendChild(this._highlightStyleElement);

    // 初始更新裁剪区域
    this._updateCutoutPosition(targetEl);

    // 添加高亮边框样式
    this._addHighlightBorderStyles();
  }

  _updateCutoutPosition(targetEl) {
    if (!targetEl || !this._highlightOverlay || !this._highlightStyleElement) return;

    const rect = targetEl.getBoundingClientRect();
    const win = this._env.window;
    const scrollX = win.scrollX  || win.pageXOffset;
    const scrollY = win.scrollY  || win.pageYOffset;

    // 计算目标元素在视口中的位置
    const targetLeft = rect.left  + scrollX;
    const targetTop = rect.top  + scrollY;
    const targetWidth = rect.width;
    const targetHeight = rect.height;

    // 计算边框偏移（为了显示高亮边框）
    const borderWidth = 3;
    const highlightLeft = targetLeft - borderWidth;
    const highlightTop = targetTop - borderWidth;
    const highlightWidth = targetWidth + (borderWidth * 2);
    const highlightHeight = targetHeight + (borderWidth * 2);

    // 创建裁剪路径：整个屏幕减去目标元素区域
    const clipPath = `
      polygon(
        0% 0%,
        0% 100%,
        ${highlightLeft}px 100%,
        ${highlightLeft}px ${highlightTop}px,
        ${highlightLeft + highlightWidth}px ${highlightTop}px,
        ${highlightLeft + highlightWidth}px ${highlightTop + highlightHeight}px,
        ${highlightLeft}px ${highlightTop + highlightHeight}px,
        ${highlightLeft}px 100%,
        100% 100%,
        100% 0%
      )
    `;

    const highlightStyle = `
      .guide-cutout-overlay.instance-${this._instanceId}  {
        clip-path: ${clipPath} !important;
        box-shadow:
          inset 0 0 0 ${borderWidth}px rgba(255, 255, 255, 0.95),
          inset 0 0 0 ${borderWidth + 2}px ${this._bgColor},
          inset 0 0 20px ${borderWidth + 6}px rgba(62, 84, 173, 0.3) !important;
        transition: clip-path 0.3s ease, box-shadow 0.3s ease !important;
      }
    `;

    this._highlightStyleElement.textContent  = highlightStyle;
  }

  _addHighlightBorderStyles() {
    const doc = this._env.rootDocument;

    // 先清理可能存在的旧样式
    const existingStyles = doc.querySelectorAll('style[data-guide-style="border"]');
    existingStyles.forEach(style  => {
      if (!style.hasAttribute(`data-instance-${this._instanceId}`))  {
        style.remove();
      }
    });

    const extraStyles = doc.createElement("style");
    extraStyles.setAttribute("data-guide-style",  "border");
    extraStyles.setAttribute(`data-instance-${this._instanceId}`,  "true");
    extraStyles.textContent  = `
      .guide-cutout-overlay.instance-${this._instanceId}  {
        isolation: isolate !important;
        contain: layout style paint !important;
      }

      @keyframes guidePulse-${this._instanceId} {
        0% {
          box-shadow:
            inset 0 0 0 3px rgba(255, 255, 255, 0.95),
            inset 0 0 0 5px ${this._bgColor},
            inset 0 0 20px 9px rgba(62, 84, 173, 0.3) !important;
        }
        50% {
          box-shadow:
            inset 0 0 0 3px rgba(255, 255, 255, 0.95),
            inset 0 0 0 5px ${this._bgColor},
            inset 0 0 25px 11px rgba(62, 84, 173, 0.4) !important;
        }
        100% {
          box-shadow:
            inset 0 0 0 3px rgba(255, 255, 255, 0.95),
            inset 0 0 0 5px ${this._bgColor},
            inset 0 0 20px 9px rgba(62, 84, 173, 0.3) !important;
        }
      }

      .guide-cutout-overlay.instance-${this._instanceId}  {
        animation: guidePulse-${this._instanceId} 2s ease-in-out infinite !important;
      }
    `;
    doc.head.appendChild(extraStyles);
  }

  _positionPopup(popup, targetEl) {
    const targetRect = targetEl.getBoundingClientRect();
    this._lastTargetRect = targetRect;

    setTimeout(() => {
      const popupRect = popup.getBoundingClientRect();
      const popupWidth = popupRect.width;
      const popupHeight = popupRect.height;

      let position = this._position;
      if (position === "auto") {
        position = this._calculateBestPosition(targetRect, popupWidth, popupHeight);
      }

      const { top, left, finalPosition } = this._calculatePosition(
        position,
        targetRect,
        popupWidth,
        popupHeight
      );

      popup.style.top  = `${top}px`;
      popup.style.left  = `${left}px`;
      popup.classList.add(finalPosition);
    }, 0);
  }

  _calculatePosition(position, targetRect, popupWidth, popupHeight) {
    const win = this._env.window;
    const viewportWidth = win.innerWidth;
    const viewportHeight = win.innerHeight;
    const margin = 20;
    const arrowOffset = 14;

    let top, left, finalPosition = position;

    switch (position) {
      case "top":
        top = targetRect.top  - popupHeight - arrowOffset;
        left = targetRect.left  + targetRect.width  / 2 - popupWidth / 2;
        break;
      case "bottom":
        top = targetRect.bottom  + arrowOffset;
        left = targetRect.left  + targetRect.width  / 2 - popupWidth / 2;
        break;
      case "left":
        top = targetRect.top  + targetRect.height  / 2 - popupHeight / 2;
        left = targetRect.left  - popupWidth - arrowOffset;
        break;
      case "right":
        top = targetRect.top  + targetRect.height  / 2 - popupHeight / 2;
        left = targetRect.right  + arrowOffset;
        break;
    }

    // 边界调整逻辑保持不变
    let adjusted = false;

    if (left < margin) {
      left = margin;
      adjusted = true;
    } else if (left + popupWidth > viewportWidth - margin) {
      left = viewportWidth - popupWidth - margin;
      adjusted = true;
    }

    if (top < margin) {
      if (position === "top") {
        top = targetRect.bottom  + arrowOffset;
        finalPosition = "bottom";
      } else {
        top = margin;
      }
      adjusted = true;
    } else if (top + popupHeight > viewportHeight - margin) {
      if (position === "bottom") {
        top = targetRect.top  - popupHeight - arrowOffset;
        finalPosition = "top";
      } else {
        top = viewportHeight - popupHeight - margin;
      }
      adjusted = true;
    }

    if (adjusted && finalPosition !== position) {
      switch (finalPosition) {
        case "top":
          top = targetRect.top  - popupHeight - arrowOffset;
          left = targetRect.left  + targetRect.width  / 2 - popupWidth / 2;
          break;
        case "bottom":
          top = targetRect.bottom  + arrowOffset;
          left = targetRect.left  + targetRect.width  / 2 - popupWidth / 2;
          break;
        case "left":
          top = targetRect.top  + targetRect.height  / 2 - popupHeight / 2;
          left = targetRect.left  - popupWidth - arrowOffset;
          break;
        case "right":
          top = targetRect.top  + targetRect.height  / 2 - popupHeight / 2;
          left = targetRect.right  + arrowOffset;
          break;
      }

      if (left < margin) left = margin;
      if (left + popupWidth > viewportWidth - margin) left = viewportWidth - popupWidth - margin;
      if (top < margin) top = margin;
      if (top + popupHeight > viewportHeight - margin) top = viewportHeight - popupHeight - margin;
    }

    return { top, left, finalPosition };
  }

  _calculateBestPosition(targetRect, popupWidth, popupHeight) {
    const win = this._env.window;
    const viewportWidth = win.innerWidth;
    const viewportHeight = win.innerHeight;
    const margin = 20;
    const arrowOffset = 14;

    const space = {
      top: targetRect.top  - popupHeight - arrowOffset - margin,
      bottom: viewportHeight - targetRect.bottom  - popupHeight - arrowOffset - margin,
      left: targetRect.left  - popupWidth - arrowOffset - margin,
      right: viewportWidth - targetRect.right  - popupWidth - arrowOffset - margin,
    };

    let bestPosition = "bottom";
    let maxSpace = space.bottom;

    if (space.top  > maxSpace && space.top  > 0) {
      bestPosition = "top";
      maxSpace = space.top;
    }

    if (space.left  > maxSpace && space.left  > 0) {
      bestPosition = "left";
      maxSpace = space.left;
    }

    if (space.right  > maxSpace && space.right  > 0) {
      bestPosition = "right";
      maxSpace = space.right;
    }

    return bestPosition;
  }

  // 优化的位置跟踪方法
  _startPositionTracking() {
    if (!this._targetElement) return;

    // 先停止可能存在的旧监听
    this._stopPositionTracking();

    // 使用优化的防抖更新函数
    const throttledUpdate = this._throttle(() => {
      if (this._isActive) {
        this._updatePopupPosition();
        this._updateCutoutPosition(this._targetElement);
      }
    }, 100);

    // 使用 ResizeObserver 监听元素尺寸变化
    this._resizeObserver = new ResizeObserver(throttledUpdate);
    this._resizeObserver.observe(this._targetElement);

    // 优化：只监听最近2层祖先元素，避免过度监听
    let parent = this._targetElement.parentElement;
    let depth = 0;
    while (parent && depth < 2) {
      this._resizeObserver.observe(parent);
      parent = parent.parentElement;
      depth++;
    }

    // 使用 MutationObserver 监听 DOM 结构变化
    this._mutationObserver = new MutationObserver((mutations) => {
      // 只有当目标元素或其直接父级发生变化时才更新
      const shouldUpdate = mutations.some(mutation  => {
        return mutation.target  === this._targetElement ||
          (mutation.target.contains  && mutation.target.contains(this._targetElement));
      });

      if (shouldUpdate && this._isActive) {
        throttledUpdate();
      }
    });

    this._mutationObserver.observe(this._env.rootDocument.body,  {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // 监听窗口滚动和大小变化（使用被动事件监听器优化性能）
    this._scrollHandler = throttledUpdate;
    this._env.window.addEventListener('scroll',  this._scrollHandler, { passive: true });
    this._env.window.addEventListener('resize',  this._scrollHandler, { passive: true });
  }

  // 节流函数
  _throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this,  args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  _stopPositionTracking() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }

    if (this._mutationObserver) {
      this._mutationObserver.disconnect();
      this._mutationObserver = null;
    }

    if (this._scrollHandler) {
      const win = this._env.window;
      win.removeEventListener('scroll',  this._scrollHandler);
      win.removeEventListener('resize',  this._scrollHandler);
      this._scrollHandler = null;
    }

    if (this._updatePositionTimeout) {
      clearTimeout(this._updatePositionTimeout);
      this._updatePositionTimeout = null;
    }
  }

  _updatePopupPosition() {
    if (!this._isActive || !this._targetElement || !this._popupElement) return;

    // 检查元素是否还在DOM中
    if (!document.contains(this._targetElement)  || !document.contains(this._popupElement))  {
      console.warn(' 目标元素或弹窗元素已从DOM中移除，自动关闭指引');
      this._completeGuide(false);
      return;
    }

    // 防抖处理，避免频繁更新
    if (this._updatePositionTimeout) {
      clearTimeout(this._updatePositionTimeout);
    }

    this._updatePositionTimeout = setTimeout(() => {
      const targetRect = this._targetElement.getBoundingClientRect();

      // 更严格的位置变化检查，避免微小变化导致的更新
      if (this._lastTargetRect &&
        Math.abs(targetRect.top  - this._lastTargetRect.top)  < 2 &&
        Math.abs(targetRect.left  - this._lastTargetRect.left)  < 2 &&
        Math.abs(targetRect.width  - this._lastTargetRect.width)  < 2 &&
        Math.abs(targetRect.height  - this._lastTargetRect.height)  < 2) {
        return;
      }

      this._lastTargetRect = targetRect;

      // 重新定位弹窗
      const popupRect = this._popupElement.getBoundingClientRect();
      const popupWidth = popupRect.width;
      const popupHeight = popupRect.height;

      // 移除之前的位置类
      this._popupElement.classList.remove('top',  'bottom', 'left', 'right');

      let position = this._position;
      if (position === "auto") {
        position = this._calculateBestPosition(targetRect, popupWidth, popupHeight);
      }

      const { top, left, finalPosition } = this._calculatePosition(
        position,
        targetRect,
        popupWidth,
        popupHeight
      );

      // 平滑过渡
      this._popupElement.style.transition  = 'top 0.3s ease, left 0.3s ease';
      this._popupElement.style.top  = `${top}px`;
      this._popupElement.style.left  = `${left}px`;
      this._popupElement.classList.add(finalPosition);

      // 恢复原来的过渡效果
      setTimeout(() => {
        if (this._popupElement) {
          this._popupElement.style.transition  = '';
        }
      }, 300);

    }, 50); // 增加防抖延迟
  }

  _cleanup() {
    this._stopPositionTracking();

    // 清理弹窗
    if (this._popupElement) {
      // 移除事件监听器
      if (this._confirmButtonHandler) {
        const confirmBtn = this._popupElement.querySelector(".confirm-btn");
        if (confirmBtn) {
          confirmBtn.removeEventListener("click",  this._confirmButtonHandler);
        }
        this._confirmButtonHandler = null;
      }

      if (this._popupElement.parentNode)  {
        this._popupElement.parentNode.removeChild(this._popupElement);
      }
      this._popupElement = null;
    }

    // 清理高亮相关
    this._cleanupHighlight();

    // 只清理当前实例的样式
    const doc = this._env.rootDocument;
    const guideStyles = doc.querySelectorAll(`style[data-instance-${this._instanceId}]`);
    guideStyles.forEach(style  => {
      if (style.parentNode)  {
        style.parentNode.removeChild(style);
      }
    });

    // 恢复页面滚动（智能判断）
    this._unlockPageScroll();

    // 重置状态
    this._lastTargetRect = null;
    this._targetElement = null;
  }

  _completeGuide(completedByUser = true) {
    if (!this._isActive) return;

    this._cleanup();

    if (completedByUser) {
      this._env.storage.setItem(this._storageKey,  "true");
    }

    this._isActive = false;

    // 调用回调函数
    this._invokeCallback(completedByUser);

    // 可选：自动移除元素
    setTimeout(() => {
      if (this.parentNode)  {
        this.remove();
      }
    }, 300);
  }

  _invokeCallback(completedByUser, error = null) {
    if (this._onCompleteCallback) {
      try {
        this._onCompleteCallback({
          completedByUser: completedByUser,
          error: error,
          target: this._targetSelector,
          storageKey: this._storageKey
        });
      } catch (e) {
        console.error("UserGuide  回调函数执行错误:", e);
      }
    }
  }

  disconnectedCallback() {
    this._cleanup();
  }
}