

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const bcrypt = require("bcrypt");

const expect = chai.expect;
chai.use(sinonChai);

const mongoose = require("mongoose");
const UserModal = require("./models/userModal");
const userController = require("./controller/userController");

describe("User Controller", () => {
    let user;
    before(async () => {
        await mongoose.connect("mongodb+srv://sachinm20:cp300464@cluster0.nkes8uj.mongodb.net/ShopDb-Test?retryWrites=true&w=majority");
        user = new UserModal({
            _id: "69697e4df08cc1ab189e6969",
            name: "Test",
            password: "12345678",
            profilePicUrl: "uploads/images/2023-03-29T18_07_09.776Z-16096.jpg",
            email: "test@test.com",
            mobile: "9876543210",
            address: "123 Main St",
            pincode: "123456",
            orders: [],
            blocked: false,
            type: "Seller",
        });
        await user.save();
    });

    after(async () => {
        await UserModal.deleteMany({});
        await mongoose.connection.close();
    });

    // describe("postRegister", () => {
    //   const req = {
    //     body: {
    //       name: "John Doe",
    //       password: "password123",
    //       email: "john@example.com",
    //       confirmPassword: "password123",
    //       mobile: "1234567890",
    //       address: "123 Main St",
    //       pincode: "123456",
    //       type: "Buyer",
    //     },
    //     file: {
    //       fieldname: 'profile-pic',
    // originalname: 'WIN_20230120_19_27_26_Pro.jpg',
    // encoding: '7bit',
    // mimetype: 'image/jpeg',
    // destination: '../shared/uploads/images',
    // filename: '2023-04-22T17_52_45.686Z-WIN_20230120_19_27_26_Pro.jpg',
    // path: '..\\shared\\uploads\\images\\2023-04-22T17_52_45.686Z-WIN_20230120_19_27_26_Pro.jpg',
    // size: 265274
    //     },
    //   };
    //   const res = {
    //     statusCode: 1351,
    //     responseJson: null,
    //     status(code) {
    //       this.statusCode = code;
    //       return this;
    //     },
    //     json(response) {
    //       this.responseJson = response;
    //       return this;
    //     },
    //   };

    //   afterEach(() => {
    //     res.status(1351);
    //     res.json(null);
    //   });

    //   it("should return a status code of 200 and a message Registered successfully", async () => {
    //     try {
    //       await userController.postRegister(req, res, () => {
    //         console.log(res.user)
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     expect(res.statusCode).to.equal(200);
    //   });
    // });

    describe("getBlockedUsers", () => {
        const req = {};
        const res = {
            statusCode: 1351,
            responseJson: null,
            status(code) {
                this.statusCode = code;
                return this;
            },
            json(response) {
                this.responseJson = response;
                return this;
            },
        };
        afterEach(() => {
            res.status(1351);
            res.json(null);
        });

        it("should return a status code of 401 and a message No user exist", async () => {
            try {
                await userController.getBlockedUsers(req, res, () => {});
            } catch (error) {
                console.log(error);
            }

            expect(res.statusCode).to.equal(401);
            expect(res.responseJson).have.property("message", "No user exist");
        });

        it("should return a list of blocked users with a status code of 200", async () => {
            const blockedUsers = [
                {
                    _id: "64247e4df08cc1ab189eda6a",
                    name: "Alice",
                    password: "password",
                    profilePicUrl: "uploads/images/2023-03-29T18_07_09.776Z-16096.jpg",
                    email: "him@gmail.com",
                    mobile: "1234567890",
                    address: "123 Main St",
                    pincode: "123456",
                    orders: [],
                    blocked: true,
                    type: "Seller",
                },
            ];
            try {
                await UserModal.insertMany(blockedUsers);
                await userController.getBlockedUsers(req, res, () => {});
            } catch (error) {
                console.log(error);
            }

            expect(res.statusCode).to.equal(200);
            expect(res.responseJson).have.property("message", "Logged in");
            expect(res.responseJson).have.property("user");
            expect(res.responseJson.user[0]._id.toString()).to.equal(
                blockedUsers[0]._id
            );
        });
    });
    describe("getUsers", () => {
        const req = {};
        const res = {
            statusCode: 1351,
            responseJson: null,
            status(code) {
                this.statusCode = code;
                return this;
            },
            json(response) {
                this.responseJson = response;
                return this;
            },
        };

        afterEach(() => {
            res.status(1351);
            res.json(null);
        });

        it("should return a list of users with a status code of 200", async () => {
            try {
                await userController.getUsers(req, res, () => {});
            } catch (error) {
                console.log(error);
            }

            expect(res.statusCode).to.equal(200);
            // expect(res.responseJson).to.deep.equal(users);
        });

        it("should return a status code of 404 and an error message if no users exist", async () => {
            sinon.stub(UserModal, "find").rejects();
            try {
                await userController.getUsers(req, res, () => {});
            } catch (error) {
                console.log(error);
            }

            UserModal.find.restore();
            expect(res.statusCode).to.equal(404);
            expect(res.responseJson).have.property("message");
            expect(res.responseJson.message.toString()).to.equal("Error: Error");
        });
    });
    describe("postUser", () => {
        const req = {
            body: {
                username: "test@example.com",
                password: "password",
            },
        };
        const res = {
            statusCode: 1351,
            responseJson: null,
            status(code) {
                this.statusCode = code;
                return this;
            },
            json(response) {
                this.responseJson = response;
                return this;
            },
        };

        afterEach(() => {
            res.statusCode = 1351;
            res.responseJson = null;
        });

        it("should return a status code of 401 and an error message if the user does not exist", async () => {
            sinon.stub(UserModal, "findOne").returns(Promise.resolve(null));
            try {
                await userController.postUser(req, res, () => {});
            } catch (error) {
                console.log(error);
            }
            UserModal.findOne.restore();
            expect(res.statusCode).to.equal(401);
            expect(res.responseJson).to.deep.equal({ message: "User does not exist" });
        });

        it("should return a status code of 401 and an error message if the password is invalid", async () => {
            const user = { email: "test@example.com", password: "hashedPassword" };
            sinon.stub(UserModal, "findOne").returns(Promise.resolve(user));
            sinon.stub(bcrypt, "compare").returns(Promise.resolve(false));
            try {
                await userController.postUser(req, res, () => {});
            } catch (error) {
                console.log(error);
            }
            UserModal.findOne.restore();
            bcrypt.compare.restore();
            expect(res.statusCode).to.equal(401);
            expect(res.responseJson).to.deep.equal({ message: "Invalid password" });
        });

        it("should return a status code of 200 and a success message if the login is successful", async () => {
            const user = { email: "test@example.com", password: "hashedPassword" };
            sinon.stub(UserModal, "findOne").returns(Promise.resolve(user));
            sinon.stub(bcrypt, "compare").returns(Promise.resolve(true));
            try {
                await userController.postUser(req, res, () => {});
            } catch (error) {
                console.log(error);
            }
            UserModal.findOne.restore();
            bcrypt.compare.restore();
            expect(res.statusCode).to.equal(200);
            expect(res.responseJson).to.deep.equal({ message: "Logged in", user: user });
        });

        it("should return a status code of 500 and an error message if there's an error in the login process", async () => {
            sinon.stub(UserModal, "findOne").rejects();
            try {
                await userController.postUser(req, res, () => {});
            } catch (error) {
                console.log(error);
            }
            UserModal.findOne.restore();
            expect(res.responseJson).have.property("message");
            expect(res.responseJson.message.toString()).to.equal("Error: Error");
        });
    });
});