import svgPaths from "../imports/svg-64lpaevd45";

interface HeaderProps {
  onAddMeal: () => void;
}

function MaskGroup() {
  return (
    <div
      className="h-[29.977px] relative shrink-0 w-[28px]"
      data-name="Mask Group"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 30"
      >
        <g id="Mask Group">
          <mask
            height="30"
            id="mask0_4_1849"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="28"
            x="0"
            y="0"
          >
            <g id="Group 713">
              <path d={svgPaths.p8eacd00} fill="#C4C4C4" id="Ellipse 87" />
              <path d={svgPaths.p3f4b4480} fill="#C4C4C4" id="Ellipse 88" />
              <path d={svgPaths.p309a7bf0} fill="#C4C4C4" id="Subtract" />
            </g>
          </mask>
          <g mask="url(#mask0_4_1849)">
            <rect
              fill="url(#paint0_linear_4_1849)"
              height="10.8706"
              id="Rectangle 326"
              width="33.6"
              x="-1.6471"
              y="-2.30583"
            />
            <rect
              fill="#FFA833"
              height="16.4706"
              id="Rectangle 327"
              width="33.6"
              x="-1.6471"
              y="15.4824"
            />
            <rect
              fill="#F17228"
              height="7.24706"
              id="Rectangle 328"
              rx="3.62353"
              width="33.6"
              x="-1.6471"
              y="8.56475"
            />
            <rect
              fill="#F58D00"
              height="7.24706"
              id="Rectangle 329"
              width="31.9529"
              x="-23.0587"
              y="22.7295"
            />
            <rect
              fill="#F58D00"
              height="7.24706"
              id="Rectangle 330"
              width="31.9529"
              x="19.1061"
              y="22.7295"
            />
            <ellipse
              cx="8.11249"
              cy="2.81144"
              fill="white"
              id="Ellipse 93"
              rx="1"
              ry="0.5"
              transform="rotate(-20.8548 8.11249 2.81144)"
            />
            <ellipse
              cx="14"
              cy="2.48828"
              fill="white"
              id="Ellipse 94"
              rx="1"
              ry="0.5"
            />
            <ellipse
              cx="19.1176"
              cy="2.90053"
              fill="white"
              id="Ellipse 95"
              rx="1"
              ry="0.5"
              transform="rotate(28.1155 19.1176 2.90053)"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_4_1849"
            x1="15"
            x2="15"
            y1="-0.511883"
            y2="16.9881"
          >
            <stop stopColor="#FFD16D" />
            <stop offset="1" stopColor="#FF7A00" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="leading-[1.2] not-italic relative shrink-0 text-[#f17228] text-[31.11px] text-nowrap tracking-[-0.7778px] whitespace-pre">
        Food<span className="text-[#ffb30e]">Wagen</span>
      </p>
    </div>
  );
}

function Logo() {
  return (
    <div
      className="food-logo content-stretch flex gap-[11.5px] items-center relative shrink-0 w-[197px]"
      data-name="Logo"
    >
      <MaskGroup />
      <Frame />
    </div>
  );
}

function Button({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="food-add-button bg-gradient-to-r from-[#f17228] to-[#ffb30e] box-border content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[12px] relative rounded-[14px] shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] shrink-0 w-[150px] hover:shadow-lg transition-all duration-150"
      data-name="Button"
      data-testid="food-add-meal-btn"
    >
      <p className="leading-none not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white whitespace-pre">
        Add Meal
      </p>
    </button>
  );
}

export function Header({ onAddMeal }: HeaderProps) {
  return (
    <header
      className="food-header bg-white relative shadow-[0px_5px_10px_0px_rgba(255,174,0,0.26),0px_20px_40px_0px_rgba(255,174,0,0.29)] w-full"
      data-name="Top Nav"
    >
      <div className="flex flex-row items-center w-full overflow-x-hidden">
        <div className="box-border content-stretch flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[220px] py-4 w-full max-w-full">
          <Logo />
          <Button onClick={onAddMeal} />
        </div>
      </div>
    </header>
  );
}
