import * as React from "react";
import { marked } from "marked";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { Tour, Acordeon } from "@/interface/tours";

interface Props {
  tour: Tour;
}

export default function TourTabs({ tour }: Props) {
  const [activeTab, setActiveTab] = React.useState("overview");

  const tab = tour?.tab;

  if (!tab) {
    return null;
  }

  const hasOverview = tab.overview && tab.overview.timeline && Array.isArray(tab.overview.timeline);
  const hasItinerary = tab.itinerary && tab.itinerary.acordeon && Array.isArray(tab.itinerary.acordeon);
  const hasIncluded = tab.included && tab.included.titulo;
  const hasInformation = tab.information && tab.information.acordeon && Array.isArray(tab.information.acordeon);
  const hasPrice = tab.price && (tab.price.titulo || tab.price.content);

  const parseMarkdown = (content: string) => String(marked.parse(content));

  const includedContentHtml = hasIncluded && tab.included.content
    ? parseMarkdown(tab.included.content)
    : null;
  const priceContentHtml = hasPrice && tab.price.content
    ? parseMarkdown(tab.price.content)
    : null;

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <TabsList className="flex w-full md:w-auto min-w-max md:min-w-0 justify-start md:justify-center gap-1 bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
          {hasOverview && tab.overview.titulo && (
            <TabsTrigger
              value="overview"
              className="flex-1 md:flex-none px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-t-lg"
            >
              {tab.overview.titulo}
            </TabsTrigger>
          )}
          {hasItinerary && tab.itinerary.titulo && (
            <TabsTrigger
              value="itinerary"
              className="flex-1 md:flex-none px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-t-lg"
            >
              {tab.itinerary.titulo}
            </TabsTrigger>
          )}
          {hasIncluded && tab.included.titulo && (
            <TabsTrigger
              value="included"
              className="flex-1 md:flex-none px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-t-lg"
            >
              {tab.included.titulo}
            </TabsTrigger>
          )}
          {hasInformation && tab.information.titulo && (
            <TabsTrigger
              value="information"
              className="flex-1 md:flex-none px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-t-lg"
            >
              {tab.information.titulo}
            </TabsTrigger>
          )}
          {hasPrice && tab.price.titulo && (
            <TabsTrigger
              value="price"
              className="flex-1 md:flex-none px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-t-lg"
            >
              {tab.price.titulo}
            </TabsTrigger>
          )}
        </TabsList>
      </div>

      {hasOverview && (
        <TabsContent value="overview" className="mt-6 md:mt-8 animate-fade-in">
          <section>
            <div className="space-y-6">
              {tab.overview.timeline.map((item, index) => (
                <div key={index} className="timeline-item flex gap-4 md:gap-6">
                  <div className="timeline-marker flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 p-2 rounded-full bg-primary text-white flex items-center justify-center text-sm text-center ring-6 ring-primary/20">
                      {item.day}
                    </div>

                    {index < tab.overview.timeline.length - 1 && (
                      <div className="w-0.5 flex-1 mt-2 bg-linear-to-b from-primary via-primary/40 to-transparent" />
                    )}
                  </div>
                  <div className="timeline-content flex-1 pb-6 md:pb-8">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 my-2">
                      {item.titulo}
                    </h3>
                    <div
                      className="prose prose-sm max-w-none 
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:m-0
                        prose-ul:text-gray-600 prose-ul:list-disc prose-ul:ml-4
                        prose-li:mb-1"
                      dangerouslySetInnerHTML={{ __html: item.itemsDay ? String(marked.parse(item.itemsDay)) : '' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
      )}

      {hasItinerary && (
        <TabsContent value="itinerary" className="mt-6 md:mt-8 animate-fade-in">
          <section>
            <div className="space-y-3">
              {tab.itinerary.acordeon.map((item, index) => (
                <AccordionItem key={index} item={item} />
              ))}
            </div>
          </section>
        </TabsContent>
      )}

      {hasInformation && (
        <TabsContent value="information" className="mt-6 md:mt-8 animate-fade-in">
          <section>
            <div className="space-y-3">
              {tab.information.acordeon.map((item, index) => (
                <AccordionItem key={index} item={item} />
              ))}
            </div>
          </section>
        </TabsContent>
      )}

      {hasIncluded && (
        <TabsContent value="included" className="mt-6 md:mt-8 animate-fade-in">
          <section>
            <div
              className="prose prose-sm md:prose-base max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-2
                prose-ul:text-gray-600 prose-ul:list-disc prose-ul:ml-4
                prose-li:mb-1"
              dangerouslySetInnerHTML={{ __html: includedContentHtml || '' }}
            />
          </section>
        </TabsContent>
      )}

      {hasPrice && (
        <TabsContent value="price" className="mt-6 md:mt-8 animate-fade-in">
          <section>
            <div
              className="prose prose-sm md:prose-base max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-2
                prose-ul:text-gray-600 prose-ul:list-disc prose-ul:ml-4
                prose-li:mb-1"
              dangerouslySetInnerHTML={{ __html: priceContentHtml || '' }}
            />
          </section>
        </TabsContent>
      )}
    </Tabs>
  );
}

function AccordionItem({ item }: { item: Acordeon }) {
  const contentHtml = item.content ? String(marked.parse(item.content)) : '';

  return (
    <details className="group border border-gray-200 rounded-xl overflow-hidden">
      <summary className="w-full flex items-center justify-between p-4 md:p-5 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-semibold text-gray-800 text-sm md:text-base text-left">
          {item.titulo}
        </span>
        <span className="text-gray-400 transition-transform duration-200 group-open:rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </summary>
      <div className="px-4 md:px-5 pb-4 md:pb-5">
        <div
          className="prose prose-base max-w-none 
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:m-0
            prose-ul:text-gray-600 prose-ul:list-disc prose-ul:ml-4
            prose-li:mb-1"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </details>
  );
}
