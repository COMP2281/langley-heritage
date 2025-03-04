import ContactForm from '../contactform';

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
            <h2 className="text-3xl font-bold font-serif text-[#780502]">
                Contact Us
            </h2>
            <ContactForm />
	    </div>
  );
};

export default Contact;