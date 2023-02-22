import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn, FaDiscord } from 'react-icons/fa';
import ThemeToggler from '@ui/ThemeToggler';
import Button from '@ui/Button';
import clsx from 'clsx';

export default function Header() {
    const [top, setTop] = useState(true);
    // detect whether user has scrolled the page down by 10px
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <header
            className={clsx(
                'z-50 fixed inset-x-0 top-0 flex flex-1 items-center justify-between p-4 lg:p-5',
                !top &&
                    'bg-gray-50 md:bg-opacity-90 md:backdrop-blur-sm border-b border-b-gray-300 dark:bg-black dark:md:bg-opacity-90 dark:border-b-gray-500'
            )}
        >
            <h1 className="font-neue leading-6 tracking-tight text-xl">
                Guido
                <br />
                Gennari
            </h1>
            <div className="flex">
                <ul id="socials" className="font-extrabold tracking-tight text-3xl flex">
                    <li>
                        <Button
                            colorScheme="black"
                            style="link"
                            square
                            title="GitHub"
                            target="_blank"
                            href="https://github.com/xdguido"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only">GitHub page</span>
                            <FaGithub className="h-7 w-7" />
                        </Button>
                    </li>
                    <li>
                        <Button
                            colorScheme="black"
                            style="link"
                            square
                            title="Discord"
                            target="_blank"
                            href="https://discordapp.com/users/xdguido#4212"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only">Discord profile</span>
                            <FaDiscord className="h-7 w-7" />
                        </Button>
                    </li>
                    <li>
                        <Button
                            colorScheme="black"
                            style="link"
                            square
                            title="LinkedIn"
                            target="_blank"
                            href="https://www.linkedin.com/in/guido-gennari/"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only">LinkedIn page</span>
                            <FaLinkedinIn className="h-7 w-7" />
                        </Button>
                    </li>
                </ul>
                <div className="flex justify-center items-center pl-3 ml-3 sm:pl-5 sm:ml-5 border-l border-l-slate-200 dark:border-l-slate-400">
                    <ThemeToggler />
                </div>
            </div>
        </header>
    );
}
