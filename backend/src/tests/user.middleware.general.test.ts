import { Request, Response, NextFunction } from "express";
import { dateIsValid, registerMW, loginMW } from "@middlewares/user.middleware.js";
import { errorDefault } from "@modules/errors.module.js";

describe("dateIsValid", () => {
  it("should return true for a valid date string", () => {
    expect(dateIsValid("2022-01-01")).toBe(true);
  });

  it("should return true for a valid date number", () => {
    expect(dateIsValid(1640995200000)).toBe(true);
  });

  it("should return false for an invalid date string", () => {
    expect(dateIsValid("invalidDate")).toBe(false);
  });

  it("should return false for an invalid date number", () => {
    expect(dateIsValid(NaN)).toBe(false);
  });
});

describe("registerMW", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        name: "test",
        surname: "test",
        birthday: "01-01-2003",
        email: "foo@example.com",
        password: "password11111111"
      }
    } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    next = jest.fn();
  });

  it("should return 400 with error message if request body is empty", async () => {
    req.body = null;
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body is empty" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.name parameter is missing or empty", async () => {
    req.body.name = "";
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.name parameter is missing or empty" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.surname parameter is missing or empty", async () => {
    req.body.surname = "";
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.surname parameter is missing or empty" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.birthday parameter is missing or empty", async () => {
    req.body.birthday = "";
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.birthday parameter is missing or empty" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.name parameter length is less than 3", async () => {
    req.body.name = "ab";
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.name parameter must be between 3 and 50 characters" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.name parameter length is greater than 50", async () => {
    req.body.name = "a".repeat(51);
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.name parameter must be between 3 and 50 characters" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.surname parameter length is less than 3", async () => {
    req.body.surname = "ab";
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.surname parameter must be between 3 and 50 characters" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.surname parameter length is greater than 50", async () => {
    req.body.surname = "a".repeat(51);
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.surname parameter must be between 3 and 50 characters" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.birthday parameter is not a valid date", async () => {
    req.body.birthday = "invalidDate";
    registerMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.birthday parameter is not a valid date" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should call next if all validations pass", async () => {
    req.body.name = "John";
    req.body.surname = "Doe";
    req.body.birthday = "01-01-2022";
    req.body.email = "john.doe@gmail.com";
    req.body.password = "reqjoewaadoe";
    registerMW(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe("loginMW", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        email: "foo@example.com",
        password: "password11111111"
      }
    } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    next = jest.fn();
  });

  it("should return 400 with error message if request body is empty", async () => {
    req.body = null;
    loginMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body is empty" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.email parameter is missing or empty", async () => {
    req.body.email = "";
    loginMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.email parameter is missing or empty" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.password parameter is missing or empty", async () => {
    req.body.password = "";
    loginMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.password parameter is missing or empty" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.email parameter is not a valid email", async () => {
    req.body.email = "invalidEmail";
    loginMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.email parameter is not a valid email" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.password parameter length is less than 8", async () => {
    req.body.password = "pass";
    loginMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.password parameter must be between 8 and 50 characters" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should return 400 with error message if request body.password parameter length is greater than 50", async () => {
    req.body.password = "a".repeat(51);
    loginMW(req, res, next);
    const expectedError = { ...errorDefault, message: "Request body.password parameter must be between 8 and 50 characters" };
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it("should call next if all validations pass", async () => {
    req.body.email = "test@example.com";
    req.body.password = "password123";
    loginMW(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});