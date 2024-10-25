const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role // Assume you set req.user in your auth middleware
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' })
    }
    next()
  }
}
