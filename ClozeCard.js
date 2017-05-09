function ClozeCard(fullText, clozeDeletion) {

  // Bypasses need for using the new keyword for creating an instance of the object.
  if (!(this instanceof ClozeCard)) {
  	return new ClozeCard(fullText, clozeDeletion);
  }

  this.fullText = fullText;
  this.clozeDeletion = clozeDeletion;
  this.partialText = makePartial(fullText, clozeDeletion);

  function makePartial(fullText, clozeDeletion) {

  	if (clozeDeletion.length === 0) {
  		throw error ("Cloze deletion " + clozeDeletion + " does not appear in the input text.")
  		return;
  	}

  	//fullText.slice(0, clozeDeletion)
  	return fullText.replace(clozeDeletion,'...');
  }
}

ClozeCard.prototype.displayCard = function displayCard() {
  //return this.partial.replace(/\.\.\./, "'" + this.cloze + "'");
  return(this.fullText);
};

module.exports = ClozeCard;