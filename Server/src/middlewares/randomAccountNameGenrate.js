module.exports = async function(req,res,next) {
  if (this.isNew) {
    let base = this.userName.replace(/[0-9]/g, '').toLowerCase().split(" ").join("")+"@";
    let candidate = base;
    let counter = 1;

    do{
      candidate = base + counter;
      counter++;
    }while (await this.constructor.findOne({ "profile.accountName": candidate }));

    this.profile.accountName = candidate
    next
  }
};