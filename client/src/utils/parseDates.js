/** PARSE DATES
 *  @param     {String}  date  Raw date string
 *  @returns   {String}        Natural language locale date
*/
export default function parseDate(date) {
    return new Date(date).toLocaleDateString();
}
