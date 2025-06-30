# AI Literacy Project - Database Documentation

## Database Overview
This project uses MongoDB as its database system, with Mongoose as the ODM (Object Data Modeling) library. The database is designed to store user uploads and their associated metadata for the AI literacy platform.

## Database Connection
- **Database URL**: `mongodb://localhost:27017/myTips`
- **Connection Options**:
  - `useNewUrlParser: true` - For better URL parsing
  - `useUnifiedTopology: true` - For stable topology engine

## Database Schema

### User Uploads Schema
The main schema for storing user uploads (`userUploadSchema`):

```javascript
{
    author: {
        type: String,
        required: true
    },
    uploaderEmail: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please enter a valid E-Mail adress"]
    },
    uploadType: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: new Date()
    },
    ageRecommendation: {
        type: Number,
        required: true
    },
    uploadTitle: {
        type: String,
        required: true
    },
    uploadDescription: {
        type: String,
        required: true
    },
    fileURL: {
        type: String,
        required: true
    },
    thumbnailURL: {
        type: String,
        required: true
    },
    uploadTags: {
        type: [String],
        default: []
    },
    reviewStatus: {
        type: String,
        default: "pending"
    },
    reviewNotes: {
        type: String
    },
    reviewedByAdmin: {
        type: String,
        default: null
    },
    rating: {
        type: ratingSchema
    }
}
```

### Rating Sub-Schema
The schema for rating information (`ratingSchema`):

```javascript
{
    totalRatings: {
        type: [Number],
        default: [],
        validate: {
            validator: function(arr) {
                return arr.every(val => 
                    [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0].includes(val)
                )
            },
            message: "Rating Typ ist nicht benutzbar: {VALUE}"
        }
    },
    averageRating: {
        type: Number,
        default: 0.0
    },
    ratingCount: {
        type: Number,
        default: 0
    }
}
```

## API Endpoints

### 1. Server Health Check
- **Endpoint**: `GET /`
- **Description**: Basic server health check
- **Response**: Text message confirming server is live

### 2. Get All Uploads
- **Endpoint**: `GET /get-data`
- **Description**: Retrieves all user uploads from the database
- **Response**: JSON array of all upload documents
- **Error Response**: Status 500 with error message

### 3. Add New Upload
- **Endpoint**: `POST /add-entry`
- **Description**: Creates a new upload entry in the database
- **Request Body**: JSON object containing upload details
  ```javascript
  {
    author: String,
    uploaderEmail: String,
    uploadType: String,
    uploadDate: Date,
    ageRecommendation: Number,
    uploadTitle: String,
    uploadDescription: String,
    fileURL: String,
    thumbnailURL: String,
    uploadTags: [String],
    reviewStatus: String,
    reviewNotes: String,
    reviewedByAdmin: String,
    rating: Object
  }
  ```
- **Success Response**: Status 200 with success message
- **Error Response**: Status 500 with error message

## Error Handling
The application implements try-catch blocks for all database operations with:
- Proper error logging
- User-friendly error messages
- Appropriate HTTP status codes
- Automatic connection closure

## Security Features
1. Email validation using regex pattern
2. CORS middleware enabled for development
3. Input validation through Mongoose schema
4. Rating value validation through custom validator

## Development Setup
1. Ensure MongoDB is installed and running on port 27017
2. Install dependencies: `npm install`
3. Required packages:
   - mongoose
   - express
   - cors

## Notes for Developers
- The database uses Mongoose's built-in validation
- All dates are stored in ISO format
- Rating values are restricted to predefined increments (1.0-5.0 in 0.5 steps)
- Review status defaults to "pending"
- The server runs on port 3000 by default 
