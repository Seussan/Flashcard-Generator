function BasicCard(front, back) {

  // Bypasses need for using the new keyword for creating an instance of the object.
  if (!this instanceof BasicCard) {
  	return new BasicCard(front, back);
  }

  this.front = front;
  this.back = back;

}

module.exports = BasicCard;