const request = (url, data = {}, method = "get") => {
  let baseUrl = "http://localhost:3000/";
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      method,
      data,
      success: (res) => {
        // 如果HTTP状态码以2开头则可以拿到数据
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
export default request;
