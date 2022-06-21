
export function passedXMinutes(dateSaved: Date, minutes: number): boolean {
    // IF MODIFIED SINCE HEADER? OR MAYBE EVERY 3 MINUTES?
    if(dateSaved == undefined)
        return true;
    let currentDate = new Date()
    let thirtyMinsFromDateSaved = new Date(dateSaved.getTime() + minutes*60000);
    if(currentDate > thirtyMinsFromDateSaved)
        return true
    return false
}
