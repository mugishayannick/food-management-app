import { Instagram, Facebook, Twitter } from "lucide-react";

function Items() {
  return (
    <div
      className="content-stretch flex flex-col gap-[16px] items-start leading-none not-italic relative shrink-0 text-[18px] text-neutral-100 text-nowrap whitespace-pre"
      data-name="Items"
    >
      <p className="relative shrink-0">About us</p>
      <p className="relative shrink-0">Team</p>
      <p className="relative shrink-0">Careers</p>
      <p className="relative shrink-0">Blog</p>
    </div>
  );
}

function Items1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[16px] items-start leading-none not-italic relative shrink-0 text-[18px] text-neutral-100 text-nowrap whitespace-pre"
      data-name="Items"
    >
      <p className="relative shrink-0">{`Help & Support`}</p>
      <p className="relative shrink-0">{`Partner with us `}</p>
      <p className="relative shrink-0">Ride with us</p>
    </div>
  );
}

function Items2() {
  return (
    <div
      className="content-stretch flex flex-col gap-[16px] items-start leading-none not-italic relative shrink-0 text-[18px] text-neutral-100 text-nowrap whitespace-pre"
      data-name="Items"
    >
      <p className="relative shrink-0">{`Terms & Conditions`}</p>
      <p className="relative shrink-0">{`Refund & Cancellation`}</p>
      <p className="relative shrink-0">Privacy Policy</p>
      <p className="relative shrink-0">Cookie Policy</p>
    </div>
  );
}

function FooterMenuItems() {
  return (
    <div
      className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0"
      data-name="Footer Menu Items"
    >
      <p className="leading-[1.2] not-italic relative shrink-0 text-[22px] text-nowrap text-white whitespace-pre">
        Company
      </p>
      <Items />
    </div>
  );
}

function FooterMenuItems1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0"
      data-name="Footer Menu Items"
    >
      <p className="leading-[1.2] not-italic relative shrink-0 text-[22px] text-nowrap text-white whitespace-pre">
        Contact
      </p>
      <Items1 />
    </div>
  );
}

function FooterMenuItems2() {
  return (
    <div
      className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0"
      data-name="Footer Menu Items"
    >
      <p className="leading-[1.2] not-italic relative shrink-0 text-[22px] text-nowrap text-white whitespace-pre">
        Legal
      </p>
      <Items2 />
    </div>
  );
}

function Menu() {
  return (
    <div
      className="content-stretch flex flex-col sm:flex-row items-start justify-between gap-8 sm:gap-0 relative shrink-0 w-full sm:w-auto sm:min-w-[607px]"
      data-name="Menu"
    >
      <FooterMenuItems />
      <FooterMenuItems1 />
      <FooterMenuItems2 />
    </div>
  );
}

function Icons() {
  return (
    <div
      className="content-stretch flex gap-[16px] items-start leading-none not-italic opacity-80 relative shrink-0 text-[24px] text-neutral-100 text-nowrap whitespace-pre"
      data-name="Icons"
    >
      <Instagram className="w-6 h-6" />
      <Facebook className="w-6 h-6" />
      <Twitter className="w-6 h-6" />
    </div>
  );
}

function FollowUs() {
  return (
    <div
      className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0"
      data-name="Follow Us"
    >
      <p className="leading-[1.2] not-italic opacity-60 relative shrink-0 text-[18px] text-neutral-100 text-nowrap uppercase whitespace-pre">
        Follow Us
      </p>
      <Icons />
    </div>
  );
}

function TextField() {
  return (
    <div
      className="basis-0 bg-[#424242] grow h-full min-h-px min-w-px relative rounded-[8px] shrink-0"
      data-name="Text Field"
    >
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center leading-[1.4] pb-[8px] pl-[16px] pr-0 pt-[7px] relative size-full text-[#adadad] text-nowrap whitespace-pre">
          <span className="not-italic relative shrink-0 text-[24px]">✉</span>
          <input
            type="email"
            placeholder="Enter Your email"
            className="bg-transparent outline-none font-normal relative shrink-0 text-[18px] text-[#adadad] placeholder:text-[#adadad] flex-1"
          />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <button
      className="bg-gradient-to-l from-[#f17228] to-[#ffb30e] box-border content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[21px] relative rounded-[8px] shadow-[0px_5px_8px_0px_rgba(222,151,0,0.24),0px_14px_32px_0px_rgba(255,178,14,0.29)] shrink-0 w-[133px] hover:shadow-lg transition-all duration-150"
      data-name="Button"
    >
      <p className="leading-none not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white whitespace-pre">
        Subscribe
      </p>
    </button>
  );
}

function TextFieldButton() {
  return (
    <div
      className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full"
      data-name="Text Field + Button"
    >
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <TextField />
      </div>
      <Button />
    </div>
  );
}

function Subscription() {
  return (
    <div
      className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full"
      data-name="Subscription"
    >
      <p className="leading-[1.4] relative shrink-0 text-[#bbbbbb] text-[18px] w-full">
        Receive exclusive offers in your mailbox
      </p>
      <TextFieldButton />
    </div>
  );
}

function FollowSubscription() {
  return (
    <div
      className="content-stretch flex flex-col gap-[43px] items-start relative shrink-0 w-full sm:w-[483px]"
      data-name="Follow + Subscription"
    >
      <FollowUs />
      <Subscription />
    </div>
  );
}

function MenuSubscription() {
  return (
    <div
      className="content-stretch flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0 relative shrink-0 w-full"
      data-name="Menu + Subscription"
    >
      <Menu />
      <FollowSubscription />
    </div>
  );
}

function Copyright() {
  return (
    <div
      className="content-stretch flex gap-[10px] items-center relative shrink-0 text-neutral-100 text-nowrap whitespace-pre"
      data-name="Copyright"
    >
      <p className="font-normal leading-[1.2] relative shrink-0 text-[15px]">
        All rights Reserved
      </p>
      <p className="leading-[normal] not-italic relative shrink-0 text-[16px]">
        ©
      </p>
    </div>
  );
}

function Company() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-start relative shrink-0"
      data-name="Company"
    >
      <p className="leading-[1.2] relative shrink-0 text-[15px] text-neutral-100 text-nowrap whitespace-pre">
        Your Company, 2021
      </p>
    </div>
  );
}

function RIghts() {
  return (
    <div
      className="content-stretch flex gap-[10px] items-start relative shrink-0"
      data-name="RIghts"
    >
      <Copyright />
      <Company />
    </div>
  );
}

function ThemeWagon() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-start relative shrink-0"
      data-name="ThemeWagon"
    >
      <p className="leading-[1.2] relative shrink-0 text-[15px] text-neutral-100 text-nowrap whitespace-pre">
        Themewagon
      </p>
    </div>
  );
}

function MadeBy() {
  return (
    <div
      className="content-stretch flex gap-[8px] items-start relative shrink-0"
      data-name="Made By"
    >
      <p className="font-normal leading-[1.2] relative shrink-0 text-neutral-100 text-nowrap whitespace-pre text-[15px]">
        Made with 💛 by
      </p>
      <ThemeWagon />
    </div>
  );
}

function Rights() {
  return (
    <div
      className="content-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 relative shrink-0 w-full"
      data-name="Rights"
    >
      <RIghts />
      <MadeBy />
    </div>
  );
}

function HrRights() {
  return (
    <div
      className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
      data-name="HR + Rights"
    >
      <div className="h-0 relative shrink-0 w-full" data-name="HR">
        <div className="absolute inset-[-1px_-0.07%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1520 2"
          >
            <path
              d="M1 1H1519"
              id="HR"
              stroke="#424242"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <Rights />
    </div>
  );
}

function MenuSubscriptionRights() {
  return (
    <div
      className="content-stretch flex flex-col gap-[63px] items-start relative shrink-0 w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] py-8 sm:py-12 lg:py-[60px]"
      data-name="Menu + Subscription + Rights"
    >
      <div className="h-0 relative shrink-0 w-full" data-name="HR">
        <div className="absolute inset-[-1px_-0.07%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1520 2"
          >
            <path
              d="M1 1H1519"
              id="HR"
              stroke="#424242"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <MenuSubscription />
      <HrRights />
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="food-footer bg-[#212121] content-stretch flex flex-col items-center justify-center relative w-full"
      data-name="CTA + Footer"
    >
      <MenuSubscriptionRights />
    </footer>
  );
}
