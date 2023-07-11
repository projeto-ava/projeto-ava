import { NextRequest } from "next/server";
import { UserController, UserValidationError } from "../../controllers/user";
import dbConnection from "@/app/(api)/services/db-connection";

dbConnection();


export async function PUT(req: NextRequest){
  try {
    const { email, password } = await req.json();
    if (!email || !password) throw new UserValidationError('Invalid data');
    await UserController.updatePassword({ email, password });

    return new Response(null, { status: 200 });
  }  catch (error: any) {
    return new Response(
        JSON.stringify({
            success: false,
            error: error && error?.message || 'Server error',
            errorCode: error && error?.errorCode || 'ERROR',
        }),
        { status: error && error?.statusCode || 500 }
    );
  }
}