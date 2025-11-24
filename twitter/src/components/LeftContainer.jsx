const LeftContainer = () => {
    const menuItems = [
        {
            name: "Home",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12.75 9-9 9 9m-9-9v12" />
                </svg>
            )
        },
        {
            name: "Explore",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.197 5.197a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            )
        },
        {
            name: "Notifications",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.42 1.378.75.75 0 0 0 .804-.57l1.378-5.42a.625.625 0 0 1 .57-.804l5.42-1.378a.75.75 0 0 0 .57-.804l-1.378-5.42a.625.625 0 0 1-.57-.804l-5.42-1.378a.75.75 0 0 0-.804.57l-1.378 5.42a.625.625 0 0 1-.57.804l-5.42 1.378a.75.75 0 0 0-.804.57l-1.378 5.42a.625.625 0 0 1 .57.804l5.42 1.378a.75.75 0 0 0 .804-.57Z" />
                </svg>
            )
        },
        {
            name: "Messages",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.5l1.5-1.5a2.25 2.25 0 0 1 3 0l1.5 1.5m1-1.5a2.25 2.25 0 0 1 3 0l1.5 1.5m1-1.5a2.25 2.25 0 0 1 3 0l1.5 1.5m1.5-1.5v3a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 15V8.25a2.25 2.25 0 0 1 2.25-2.25h15" />
                </svg>
            )
        },
        {
            name: "Profile",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75v-.5Z" />
                </svg>
            )
        },
    ];

    return (
        <section className="min-h-full bg-white/50 rounded-xl w-80 p-5 flex flex-col gap-6 shadow-lg">
            <section className="bg-white/50 p-5 flex-1 rounded-lg flex flex-col justify-between h-full">

                {/* Title */}
                <div className="text-500 text-3xl font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M18.901 1.056L14.777 9.27 10.117 1H1V3.22L6.152 10.155 1 22.999H5.086L8.988 18.04L13.567 23H23L17.519 14.89L23 3.22L18.901 1.056ZM11.411 17.54L10.973 17.54l-3.856-4.98L4.654 4.19H7.66L10.379 10.916L11.411 12.235L11.411 12.235L15.424 18.81H18.43L11.411 17.54Z" />
                    </svg>
                    Menu List
                </div>

                {/* Navigation List */}
                <nav className="flex flex-col gap-2 flex-1">
                    {menuItems.map((item) => (
                        <a
                            key={item.name}
                            href={`#${item.name.toLowerCase()}`}
                            className="flex items-center gap-4 p-3 rounded-full text-lg font-semibold text-gray-800 hover:bg-blue-200 transition-colors cursor-pointer w-full"
                        >
                            <span className="text-gray-700">{item.icon}</span>
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Button  */}
                <button className="bg-blue-500 text-white font-bold py-3 rounded-full text-lg shadow-md hover:bg-blue-600 transition-colors w-full">
                    Get Started
                </button>

            </section>
        </section>

    );
}

export default LeftContainer;