import {Schema, model} from 'mongoose';
import {saveContactErrorHook, updateSittingsHook} from './hooks.js';

const contactShema = new Schema (
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
     favorite: {
      type: Boolean,
      default: false,
    },
  },
  {versionKey: false, timestamps: true}
);

contactShema.post ('save', saveContactErrorHook);

contactShema.pre ('findOneAndUpdate', updateSittingsHook);
contactShema.post ('findOneAndUpdate', saveContactErrorHook);

const Contact = model ('contacts', contactShema);
export default Contact;
