export function separateData(validatedData) {
  const contactData = { ...validatedData.contact };
  const partnerData = { ...validatedData.partner };
  return { contactData, partnerData };
}
