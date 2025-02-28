const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please provide a title for a post'],
        minLength: 4,
        maxLength: 200,
        trim: true
    },
    content: {
        type: String,
        maxLength: 10000,
        trim: true
    },
    createrName: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        select: false // This makes the field protected by default
      }
}, {timestamps:true})

// taskSchema.pre('save', function(next) {
//     if (this.isModified('createdBy')) {
//       throw new Error('createdBy field is protected and cannot be modified');
//     }
//     next();
//   });

const Task = mongoose.model('Post', postSchema);

module.exports = Task;
