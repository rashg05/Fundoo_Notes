import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
            trim: true
        },
        Descreption: {
            type: String,
            required: true,
            trim: true
        },
        color: {
          type: String
        },
        IsArchived: {
          type: Boolean
        },
        IsTrash: {
          type: Boolean
        },
        UserId: {
          type: String,
          required: true
        }
  },
  {
    timestamps: true
  }
);

export default model('Note', noteSchema);
