// SUPPORTED PHONES FORMAT
// 0000-0000 // 8
// 00000-0000 // 9
// (00) 0000-0000 // 10
// (00) 00000-0000 // 11
// +00 (00) 0000-0000 // 12
// +00 (00) 00000-0000 // 13

export default (phone, userPhone) => {
  let countryCode = userPhone.substring(0, 2)
  let areaCode = userPhone.substring(2, 4)

  // Remove special characters
  phone = phone.replace(/[+()-\s]/g, '')

  // Remove leading 0 if any
  if (phone[0] === '0')
    phone = phone.substring(1, phone.length)

  // If number has 8 characters (only the number without nine digit)
  if (phone.length === 8) {
    return `${countryCode}${areaCode}9${phone}`
  }
    
  // If number has 9 characters (only the number with nine digit)
  if (phone.length === 9) {
    return `${countryCode}${areaCode}${phone}`
  }
  
  // If number has 10 characters (number and area code without nine digit)
  if (phone.length === 10) {
    areaCode = phone.substring(0, 2)
    return `${countryCode}${areaCode}9${phone.substring(2)}`
  }

  // If number has 11 characters (number and area code with nine digit)
  if (phone.length === 11) {
    return `${countryCode}${phone}`
  }

  // If number has 12 characters (number, area code and country code without nine digit)
  if (phone.length === 12) {
    countryCode = phone.substring(0, 2)
    if (countryCode !== '55')
      return false
      
      areaCode = phone.substring(2, 4)
      return `${countryCode}${areaCode}9${phone.substring(4)}`
    }
    
    // If number has 13 characters (number, area code and country code with nine digit)
    if (phone.length === 13) {
      if (phone.substring(0, 2) !== '55')
        return false
      return phone
  }

  return false
}