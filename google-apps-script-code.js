// This code should be pasted into the Google Apps Script editor

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add a timestamp to the data
    var timestamp = new Date();
    
    // The order of headers in your Google Sheet
    var headers = [
      'Timestamp', 
      'Name', 
      'Phone Number', 
      'Pub Location', 
      'Coasters per Month', 
      'Price per Coaster', 
      'Total Monthly Cost'
    ];

    // Check if the sheet has headers, and add them if it doesn't
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    // The order of data to be added to the sheet
    var rowData = [
      timestamp,
      data.name || 'N/A',
      data.phone || 'N/A',
      data.pub_location || 'N/A',
      data.coaster_amount || 'N/A',
      data.price_per_coaster || 'N/A',
      data.total_price || 'N/A'
    ];
    
    sheet.appendRow(rowData);

    // Send email notification
    var recipient = 'fabian@lysio.com';
    var subject = 'New Proposal from GoodPubTime.com for ' + data.name;
    var body = 'You have a new proposal submission:\n\n' +
               'Name: ' + data.name + '\n' +
               'Phone: ' + data.phone + '\n' +
               'Pub Location: ' + data.pub_location + '\n' +
               'Coasters per Month: ' + data.coaster_amount + '\n' +
               'Price per Coaster: ' + data.price_per_coaster + '\n' +
               'Total Monthly Cost: ' + data.total_price;
               
    MailApp.sendEmail(recipient, subject, body);

    // Return a success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return an error response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
} 