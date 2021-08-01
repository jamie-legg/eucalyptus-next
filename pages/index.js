import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
  BeakerIcon,
  BookmarkAltIcon,
  BookmarkIcon,
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from '@heroicons/react/outline'
import { BellIcon, FireIcon, HomeIcon, MenuIcon, TrendingUpIcon, UserGroupIcon, XIcon } from '@heroicons/react/outline'
import { getUser } from '../firebase/user'
import { useSession, signIn, signOut } from "next-auth/client"
import { Unauthenticated } from '../firebase/components/unauthenticated'




const navigation = [
  { name: 'Thoughts', href: '#', icon: BeakerIcon, current: true },
  { name: 'Topics', href: '#', icon: BookmarkIcon, current: false },
  { name: 'Subjects', href: '#', icon: BookmarkAltIcon, current: false },
  { name: 'Comments', href: '#', icon: ChatAltIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const topics = [
  { name: 'Node.JS', href: '#' },
  { name: 'OSINT', href: '#' },
  { name: 'Typescript', href: '#' },
  { name: 'Spiderfoot', href: '#' },
  { name: 'Discord', href: '#' },
  { name: 'Social Media', href: '#' },
  { name: 'Apple', href: '#' },
  { name: 'Philosophy', href: '#' },
]
const tabs = [
  { name: 'All Thoughts', href: '#', current: true },
  { name: 'Drafts', href: '#', current: false },
  { name: 'Classified', href: '#', current: false },
]
const classifiedThoughts = [
  {
    id: '81614',
    topics: '29',
    subjects: '11',
    comments: '2.7k',
    author: {
      name: 'Jamie Legg',
      imageUrl:
        'https://media-exp1.licdn.com/dms/image/C4D03AQEvXDy7EPVrGg/profile-displayphoto-shrink_200_200/0/1601935273276?e=1628726400&v=beta&t=356ZhezQVT569xPVcpgVVL9ifCJ2DF0aUbhXjjcIJO4',
      href: '#',
    },
    date: 'December 10 at 11:43 AM',
    href: '#',
    title: 'What would you have done differently if you ran Jurassic Park?',
    body: `Is software-defined networking the future of the internet? Do emulators like vSDNEmul actually work?`,
  },
  // More questions...
]
const whoToFollow = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]
const trendingPosts = [
  {
    id: 1,
    user: {
      name: 'Floyd Miles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
    comments: 291,
  },
  // More posts...
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Home() {
  const user = getUser();
  const [session, loading] = useSession()

  const upgrade = x => {
    return (
      <div>UPGRADE</div>
    )
  }

  const thoughtCount = 0
  const thoughtMax = 10
  if(!user) {
    return (
      <Unauthenticated />
    )
  }
  return (  
  <div className="min-h-screen bg-gray-100">
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-white shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="#">
                      <img
                        className="block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500"
                        alt="Eucalyptus"
                      />
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  <a href="#" className="text-sm font-medium text-gray-900 hover:underline">
                    Go Premium
                  </a>
                  <a
                    href="#"
                    className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>

                  {/* Profile dropdown */}
                  <Menu as="div" className="flex-shrink-0 relative ml-5">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>

                  <a
                    href="#"
                    className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    New Thought
                  </a>
                </div>

              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
              <div className="pb-8 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50',
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
              <div className="pt-10">
                <p
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="communities-headline"
                >
                  My Topics
                </p>
                <div className="mt-3 space-y-2" aria-labelledby="communities-headline">
                  {topics.map((topic) => (
                    <a
                      key={topic.name}
                      href={topic.href}
                      className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span className="truncate">{topic.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
            <div className="px-4 sm:px-0">
              <div className="sm:hidden">
                <label htmlFor="question-tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="question-tabs"
                  className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                  {tabs.map((tab, tabIdx) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      aria-current={tab.current ? 'page' : undefined}
                      className={classNames(
                        tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                        tabIdx === 0 ? 'rounded-l-lg' : '',
                        tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                        'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                      )}
                    >
                      <span>{tab.name}</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab.current ? 'bg-rose-500' : 'bg-transparent',
                          'absolute inset-x-0 bottom-0 h-0.5'
                        )}
                      />
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="sr-only">All thoughts</h1>
              <ul className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-gray-100 text-lg font-medium text-gray-900">Classified Thoughts</span>
                </div>
              </div>
              { classifiedThoughts.length > 0 && classifiedThoughts.map((thought) => (
                  <li key={thought.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
                    <article aria-labelledby={'question-title-' + thought.id}>
                      <div>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={thought.author.imageUrl} alt="" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              <a href={thought.author.href} className="hover:underline">
                                {thought.author.name}
                              </a>
                            </p>
                            <p className="text-sm text-gray-500">
                              <a href={thought.href} className="hover:underline">
                                <time dateTime={thought.datetime}>{thought.date}</time>
                              </a>
                            </p>
                          </div>
                          <div className="flex-shrink-0 self-center flex">
                            <Menu as="div" className="relative inline-block text-left">
                              {({ open }) => (
                                <>
                                  <div>
                                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                      <span className="sr-only">Open options</span>
                                      <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                  </div>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      static
                                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'flex px-4 py-2 text-sm'
                                              )}
                                            >
                                              <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                              <span>Add to favorites</span>
                                            </a>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'flex px-4 py-2 text-sm'
                                              )}
                                            >
                                              <CodeIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                              <span>Embed</span>
                                            </a>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'flex px-4 py-2 text-sm'
                                              )}
                                            >
                                              <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                              <span>Report content</span>
                                            </a>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </>
                              )}
                            </Menu>
                          </div>
                        </div>
                        <h2 id={'question-title-' + thought.id} className="mt-4 text-base font-medium text-gray-900">
                          {thought.starredSubject}
                        </h2>
                      </div>
                      <div
                        className="mt-2 text-sm text-gray-700 space-y-4"
                        dangerouslySetInnerHTML={{ __html: thought.body }}
                      />
                      <div className="mt-6 flex justify-between space-x-8">
                        <div className="flex space-x-6">
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">{thought.topics}</span>
                              <span className="sr-only">topics</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">{thought.subjects}</span>
                              <span className="sr-only">subjects</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <EyeIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">{thought.comments}</span>
                              <span className="sr-only">comments</span>
                            </button>
                          </span>
                        </div>
                        <div className="flex text-sm">
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                              <ShareIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">Share</span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-4 space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <h2 id="who-to-follow-heading" className="text-base font-medium text-gray-900">
                      Recent Comments
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        {whoToFollow.map((user) => (
                          <li key={user.handle} className="flex items-center py-4 space-x-3">
                            <div className="flex-shrink-0">
                              <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                <a href={user.href}>{user.name}</a>
                              </p>
                              <p className="text-sm text-gray-500">
                                <a href={user.href}>{'@' + user.handle}</a>
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                              >
                                <PlusIcon className="-ml-1 mr-0.5 h-5 w-5 text-rose-400" aria-hidden="true" />
                                <span>Follow</span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              <section aria-labelledby="trending-heading">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <h2 id="trending-heading" className="text-base font-medium text-gray-900">
                      Trending
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        {trendingPosts.map((post) => (
                          <li key={post.id} className="flex py-4 space-x-3">
                            <div className="flex-shrink-0">
                              <img className="h-8 w-8 rounded-full" src={post.user.imageUrl} alt={post.user.name} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-800">{post.body}</p>
                              <div className="mt-2 flex">
                                <span className="inline-flex items-center text-sm">
                                  <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                    <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                                    <span className="font-medium text-gray-900">{post.comments}</span>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
