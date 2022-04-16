// let balance = 500.0;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    // calculate balance based on transactions
    let balance = 0;
    for (let trans of this.transactions) {
      balance += trans.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    // keep track of the time of the transaction
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Goenkaji");
console.log("Starting Balance:", myAccount.balance);

t0 = new Withdrawal(46.76, myAccount);
t0.commit();
console.log("Initial transaction shoul fail:", t0);
console.log("New Balance:", myAccount.Balance);

t1 = new Deposit(120.45, myAccount);
t1.commit();
console.log("Transaction 1:", t1);
console.log("New Balance:", myAccount.balance);

t2 = new Withdrawal(150.25, myAccount);
t2.commit();
console.log("Transaction 2 should fail:", t2);
console.log("New Balance:", myAccount.balance);

t3 = new Withdrawal(9.99, myAccount);
t3.commit();
console.log("Transaction 3:", t3);
console.log("New Balance:", myAccount.balance);

console.log("Balance:", myAccount.balance);
