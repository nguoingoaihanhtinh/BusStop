// 120000 -> 120.000
export function formatCurrency(amount) {
    const numberPrice = Number(amount);
    return numberPrice.toLocaleString("en-US");
  }
  
  // return percent discount
  export function calculateDiscountPercentage(originalPrice, discountedPrice) {
    if (originalPrice <= 0 || discountedPrice < 0) {
      throw new Error("Invalid price values");
    }
    const discount = originalPrice - discountedPrice;
    const discountPercentage = (discount / originalPrice) * 100;
    if (discountPercentage < 0) return 0;
    return discountPercentage.toFixed(0);
  }
  
  //20.5 -> 20 giờ 30 phút
  export function convertToHoursAndMinutes(decimalNumber) {
    const hours = Math.floor(decimalNumber); // Extract the integer part as hours
    const minutes = Math.round((decimalNumber - hours) * 60); // Convert the decimal part to minutes
    return `${hours} giờ ${minutes} phút`;
  }
  export function formatDateAndTime(dateString, format = 'both') {
    const date = new Date(dateString); // Convert the string to a Date object
    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with 0 if needed
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month and pad with 0 if needed
    const year = date.getUTCFullYear(); // Get year
    const hours = String(date.getUTCHours()).padStart(2, '0'); // Get hours and pad with 0 if needed
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Get minutes and pad with 0 if needed
  
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}`;
  
    if (format === 'date') return formattedDate; // Return only the date
    if (format === 'time') return formattedTime; // Return only the time
    return `${formattedDate} ${formattedTime}`; // Default to return both
  }
