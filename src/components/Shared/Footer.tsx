import Image from 'next/image';
import Link from 'next/link';

function Footer() {

    const logoUrl = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL;
    if (!logoUrl) {
      return null; 
    }
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
            <div className='flex justify-start items-center gap-4'>
                <Image
                      src={logoUrl}
                      alt="Typers Logo"
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
            <h3 className="font-bold mb-2 font-sans text-2xl text-blue-950 dark:text-cyan-300">Typers</h3>
          </div>
            <p className="text-sm text-muted-foreground">Your Travel Buddy will make your journey suitable through us.</p>
        </div>
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Services</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              123 TravelLane<br />
              Travel City, TC 12345<br />
              contact@travel.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Typers. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;