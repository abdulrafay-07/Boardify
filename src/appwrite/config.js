import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //create a board
    async createBoard({title, slug, boardID, userID, username}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    boardID,
                    userID,
                    username
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createBoard :: error", error);
        }
    }

    //update a board
    async updateBoard(slug, {title, boardID}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    boardID
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateBoard :: error", error);
        }
    }

    //delete a board
    async deleteBoard(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteBoard :: error", error);
            return false;
        }
    }

    //get a board
    async getBoard(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getBoard :: error", error);
            return false;
        }
    }

    //get all boards of the user
    async getBoards(userID) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                [
                    Query.equal('userID', userID)
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getBoards :: error", error);
            return false;
        }
    }

    //upload a file
    async uploadFile(data) {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

        const file = new File([blob], 'drawing.json', { type: 'application/json' });

        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;