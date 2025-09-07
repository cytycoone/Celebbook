import { resend, FROM_EMAIL, isEmailEnabled } from '@/config/resend';
import { BookingConfirmationEmail } from './booking-confirmation';
import { BookingStatusUpdateEmail } from './booking-status-update';

interface EmailOptions {
  booking: any;
  celebrity: {
    name: string;
    profession: string;
  };
}

export async function sendBookingConfirmation({ booking, celebrity }: EmailOptions) {
  if (!isEmailEnabled || !resend) {
    console.log('Email service not configured - skipping booking confirmation email');
    return null;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.customerEmail,
      subject: 'Your Booking Confirmation',
      react: BookingConfirmationEmail({ booking, celebrity })
    });

    if (error) {
      console.error('Error sending booking confirmation email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
    throw error;
  }
}

export async function sendBookingStatusUpdate({ booking, celebrity }: EmailOptions) {
  if (!isEmailEnabled || !resend) {
    console.log('Email service not configured - skipping booking status update email');
    return null;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.customerEmail,
      subject: `Your Booking Status Has Been Updated`,
      react: BookingStatusUpdateEmail({ booking, celebrity })
    });

    if (error) {
      console.error('Error sending booking status update email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send booking status update email:', error);
    throw error;
  }
}
