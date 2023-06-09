export const ckeckErrors = (data, json) => {
  let errorJson = [];

  data.forEach((b) => {
    const checks = json.find((j) => j.Partner_Account_Name === b.Partner_Account_Name);
    if (!(checks != undefined && typeof(checks) == 'object')) {
        errorJson.push(`partner account is not matched with the data`);
    }
  });

  if (!errorJson.length) {
    data.forEach((b) => {
      json.forEach((j) => {
        if (b.Partner_Account_Name === j.Partner_Account_Name) {
          if (
            !(b.Country === j.Country &&
            b.partner_id === j.partner_id &&
            b.Model === j.Model &&
            b.Zone === j.Zone &&
            b.Currency_Of_Reporting === j.Currency_Of_Reporting &&
            b.Status === j.Status &&
            b.Year === j.Year)
          ) {
            errorJson.push(
              `Input Account details are not matched with the data`
            );
          }
        }
      });
    });
  }
  return errorJson;
};
