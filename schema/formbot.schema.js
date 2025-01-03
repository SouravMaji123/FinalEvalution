const mongoose = require("mongoose");
// const FormSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     title: { type: String, default: 'Untitled Formbot' },
//     components: [
//       {
//         type: { type: String, required: true }, // 'text', 'image', 'video', etc.
//         content: { type: String }, // Content (e.g., text, URL)
//         placeholder: { type: String }, // Placeholder for inputs
//         options: { type: [String] }, // For dropdowns, etc.
//         order: { type: Number, required: true }, // Position in the form
//         required: { type: Boolean, default: false }, // Whether the field is required
//       },
//     ],
//     link: { type: String }, // Sharable link for the formbot
//     submissions: [{ type: mongoose.Schema.Types.Mixed }], // Client-submitted data
//     createdAt: { type: Date, default: Date.now },
//   });
  
//   const Formbot = mongoose.model('Formbot', FormSchema);
//   module.exports = {
//     Formbot
// }
const FormSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled Form' },
  components: [
    {
      type: { type: String, required: true }, // 'text', 'image', etc.
      category: { type: String, required: true }, // 'bubble' or 'input'
      content: { type: String }, // Bubble content or input placeholder
      placeholder: { type: String },
      required: { type: Boolean, default: false }, // Only for client inputs
      order: { type: Number, required: true }, // Position in the form
    },
  ],
  link: { type: String },
  submissions: [{ type: mongoose.Schema.Types.Mixed }],
  createdAt: { type: Date, default: Date.now },
});

  const Formbot = mongoose.model('Formbot', FormSchema);
  module.exports = {
    Formbot
}

  