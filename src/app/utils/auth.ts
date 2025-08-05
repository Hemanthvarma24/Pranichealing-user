export const checkAuthentication = (): boolean => {
  if (typeof window === "undefined") return false

  const userStatus = localStorage.getItem("userStatus")
  return userStatus === "1" || userStatus === "0"
}

export const redirectToLogin = (intendedPath: string) => {
  if (typeof window === "undefined") return

  localStorage.setItem("redirectAfterLogin", intendedPath)
  window.location.href = "/"
}

export const handlePostLoginRedirect = (router: any, defaultPath = "/healings") => {
  const redirectUrl = localStorage.getItem("redirectAfterLogin")

  if (redirectUrl) {
    localStorage.removeItem("redirectAfterLogin")
    router.push(redirectUrl)
  } else {
    router.push(defaultPath)
  }
}
