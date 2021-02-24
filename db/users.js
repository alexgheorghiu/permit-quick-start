//Contine baza de date
var records = [
    { id: 1, username: 'ion', password: 'ion', displayName: 'Ion', emails: [ { value: 'ion@exemplu.com' } ] }
  , { id: 2, username: 'maria', password: 'maria', displayName: 'Maria', emails: [ { value: 'maria@exemplu.com' } ] }
];


/**
 * Gaseste un utilizator in "baza de date" pe baza id-ului
 * @param id - Id-ul user-ului
 * @param cb - Functia de callback
*/
exports.findById = function(id) {  
  var idx = id - 1;
  if (records[idx]) {
    return records[idx];
  }   
}


/**
 * Gaseste un utilizator in "baza de date" pe baza numelui
 * @param username - Numele de utilizator al user-ului
*/
exports.findByUsername = function(username) {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return record;
      }
    }
    return null;
}


/**
 * Gaseste un utilizator in "baza de date" pe baza numelui si parolei
 * @param username - Numele de utilizator al user-ului
*/
exports.findByUsernameAndPassword = function(username, password) {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.username === username && record.password === password) {
      return record;
    }
  }
  return null;
}