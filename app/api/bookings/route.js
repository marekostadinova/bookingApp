import connectDB from "@/lib/mongodb"; //Ова ја зема функцијата за поврзување со MongoDB.
import Booking from "@/models/Booking";

export const runtime = "nodejs"; //Кажува дека овој API Route треба да се извршува во Node.js runtime.

export async function GET() { //Да ги земе сите термини од MongoDB
  try {
    await connectDB();

    const bookings = await Booking.find(); // Најди ги сите документи во Booking collection

    return Response.json(
      {
        message: "Термините се успешно вчитани",
        bookings: bookings,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB(); //se povrzuva so MongoDB

    //gi zemame podatocite sto ke gi isprati formata
    const body = await request.json();

    //se kreira nov dokument vo MongoDB
    const newBooking = await Booking.create({ 
      name: body.name,
      email: body.email,
      service: body.service,
      date: body.date,
      time: body.time,
    });

    return Response.json(
      {
        message: "Терминот е успешно зачуван", //Испраќаме одговор назад
        booking: newBooking,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
