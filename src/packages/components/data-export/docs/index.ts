import fetch from '../../../../sites/pc/http/http';

export function inquiryDownload(
  data = {
    page: {
      currentPage: 1,
      pageSize: 20
    }
  }
) {
  return fetch({
    url: '/iflorens-order/api/co/v1/conversion/inquiry/download',
    method: 'post',
    data
  });
}
