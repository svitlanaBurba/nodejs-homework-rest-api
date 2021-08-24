const {Schema, model} = require('mongoose');

const contactSchema = new Schema(
  {
    //Schema
    name: {
      type: String,
      required: [true, 'Set name for contact']
    },
    email: {
      type: String
      // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phone: {
      type: String
      //     validate: {
      //       validator: function (value) {
      //         return /\d{3}-\d{3}-\d{4}/.test(value);
      //       },
      //       message: props => `${props.value} is not a valid phone number!`
      //     }
    },
    favorite: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {versionKey: false, timestamps: true}
);

const Contact = model('contact', contactSchema); //Model

module.exports = Contact;
