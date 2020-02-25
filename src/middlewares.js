// 로그인 상태인지 화면마다 확인하기 위한 middleware
export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("You need to log in to perform this action");
  }
  return;
};
