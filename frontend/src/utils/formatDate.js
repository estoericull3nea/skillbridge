export const formatDate = (dateString) => {
  const [month, day, year] = dateString.split('/')

  const date = new Date(`${year}-${month}-${day}`)

  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  return date.toLocaleDateString('en-US', options)
}
