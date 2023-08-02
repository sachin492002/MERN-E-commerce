import React from "react";

import './Dashboard.css'
export default function Temp() {
    return (

        <section className="pt-16 bg-blueGray-50">
            <div className="w-full lg:w-4/12 px-4 mx-auto">
                <div
                    className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4 flex justify-center">
                                <div className="relative">
                                    <img alt="..."
                                         src="data:image/jpeg;base64,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"
                                         className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
                                </div>
                            </div>
                            <div className="w-full px-4 text-center mt-20">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
                                        <span className="text-sm text-blueGray-400">Friends</span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                10
              </span>
                                        <span className="text-sm text-blueGray-400">Photos</span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                89
              </span>
                                        <span className="text-sm text-blueGray-400">Comments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-12">
                            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                Jenna Stones
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                Los Angeles, California
                            </div>
                            <div className="mb-2 text-blueGray-600 mt-10">
                                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                Solution Manager - Creative Tim Officer
                            </div>
                            <div className="mb-2 text-blueGray-600">
                                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                University of Computer Science
                            </div>
                        </div>
                        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                        An artist of considerable range, Jenna the name taken
                                        by Melbourne-raised, Brooklyn-based Nick Murphy
                                        writes, performs and records all of his own music,
                                        giving it a warm, intimate feel with a solid groove
                                        structure. An artist of considerable range.
                                    </p>
                                    <a href="javascript:void(0);" className="font-normal text-pink-500">
                                        Show more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="relative  pt-8 pb-6 mt-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Made with <a href="https://www.creative-tim.com/product/notus-js"
                                             className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus
                                JS</a> by <a href="https://www.creative-tim.com"
                                             className="text-blueGray-500 hover:text-blueGray-800"
                                             target="_blank"> Creative Tim</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
                )
                }
