"use server"

import { RegistrationSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

const registration = async (values: z.infer<typeof RegistrationSchema>) => {
  const result = RegistrationSchema.safeParse(values);

  if (!result.success) return { error: "Invalid fields!" };

  const { name, email, password } = result.data;
  const existingUser = await getUserByEmail(email);

  if(!!existingUser) return { error: "Email is already in use!" };
  
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({ data: { name, email, password: hashedPassword } });

  return { success: "User created!" }
}

export { registration };