/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Calendar, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { StatusBadge } from "../../components/StatusBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const releases = [
  {
    version: "v4.2.1",
    date: "2024-06-16",
    type: "Patch",
    status: "latest",
    highlights: [
      "Critical security patch for authentication module",
      "Performance improvements for database queries",
      "Fixed memory leak in background tasks",
    ],
    features: [],
    improvements: [
      "Optimized API response times by 25%",
      "Reduced memory usage in worker processes",
      "Enhanced error logging and debugging capabilities",
    ],
    bugFixes: [
      "Fixed issue with session timeout on mobile devices",
      "Resolved data export errors for large datasets",
      "Corrected timezone handling in activity logs",
    ],
    breaking: [],
  },
  {
    version: "v4.2.0",
    date: "2024-06-01",
    type: "Minor",
    status: "stable",
    highlights: [
      "New customizable dashboard widgets",
      "Advanced filtering options for reports",
      "Enhanced API documentation",
    ],
    features: [
      "Customizable dashboard widgets with drag-and-drop interface",
      "New advanced filtering system for all data tables",
      "Real-time collaboration features for team workspaces",
      "API rate limiting and throttling controls",
      "Webhook support for external integrations",
    ],
    improvements: [
      "Redesigned user settings interface",
      "Improved mobile responsiveness across all pages",
      "Enhanced search functionality with fuzzy matching",
    ],
    bugFixes: [
      "Fixed notification delivery issues",
      "Resolved calendar sync problems",
      "Corrected permission inheritance for nested resources",
    ],
    breaking: [
      "API endpoint /v1/users renamed to /v2/users",
      "Deprecated old authentication method (use OAuth 2.0)",
    ],
  },
  {
    version: "v4.1.5",
    date: "2024-05-15",
    type: "Patch",
    status: "stable",
    highlights: ["Bug fixes and stability improvements", "Security updates"],
    features: [],
    improvements: [
      "Enhanced data validation on form inputs",
      "Improved error messages for better user guidance",
    ],
    bugFixes: [
      "Fixed file upload issues in Chrome browser",
      "Resolved incorrect totals in financial reports",
      "Fixed broken links in email notifications",
      "Corrected date formatting in exported files",
    ],
    breaking: [],
  },
  {
    version: "v4.1.0",
    date: "2024-04-20",
    type: "Minor",
    status: "stable",
    highlights: [
      "Multi-language support",
      "Enhanced security features",
      "New reporting capabilities",
    ],
    features: [
      "Multi-language support (English, Spanish, French, German)",
      "Two-factor authentication",
      "Custom report builder with visual editor",
      "Automated backup scheduling",
    ],
    improvements: [
      "Faster page load times",
      "Better accessibility compliance (WCAG 2.1 AA)",
      "Enhanced keyboard navigation",
    ],
    bugFixes: [
      "Fixed CSV export encoding issues",
      "Resolved calendar view rendering problems",
      "Corrected permission checks for shared resources",
    ],
    breaking: [],
  },
  {
    version: "v4.0.8",
    date: "2024-03-28",
    type: "Patch",
    status: "stable",
    highlights: ["Critical security patch", "Performance improvements"],
    features: [],
    improvements: [
      "Improved database query optimization",
      "Enhanced caching mechanisms",
    ],
    bugFixes: [
      "Fixed XSS vulnerability in user input fields",
      "Resolved SQL injection vulnerability",
      "Fixed session management issues",
    ],
    breaking: [],
  },
];

export function ReleaseNotes() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getBadgeType = (type: string): "warning" | "active" | "inactive" => {
    if (type === "Major") return "warning";
    if (type === "Minor") return "active";
    return "inactive";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/version")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("common.back")}
        </Button>
        <div>
          <h1 className="text-gray-900">{t("releaseNotes.title")}</h1>
          <p className="text-gray-600 mt-1">{t("releaseNotes.description")}</p>
        </div>
      </div>

      {/* Release Timeline */}
      <div className="space-y-4">
        {releases.map((release, index) => (
          <Card key={release.version} className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle>{release.version}</CardTitle>
                    <StatusBadge
                      status={getBadgeType(release.type)}
                      label={release.type}
                    />
                    {release.status === "latest" && (
                      <StatusBadge status="active" label="Latest" />
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {release.date}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Highlights */}
              <div>
                <h3 className="text-gray-900 mb-3">Highlights</h3>
                <ul className="space-y-2">
                  {release.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accordion for detailed changes */}
              <Accordion type="single" collapsible className="border-t pt-4">
                {release.features.length > 0 && (
                  <AccordionItem value="features">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span>New Features ({release.features.length})</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 mt-2">
                        {release.features.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {release.improvements.length > 0 && (
                  <AccordionItem value="improvements">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-blue-600" />
                        <span>
                          Improvements ({release.improvements.length})
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 mt-2">
                        {release.improvements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {release.bugFixes.length > 0 && (
                  <AccordionItem value="bugfixes">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-600" />
                        <span>Bug Fixes ({release.bugFixes.length})</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 mt-2">
                        {release.bugFixes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {release.breaking.length > 0 && (
                  <AccordionItem value="breaking">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-red-600" />
                        <span>
                          Breaking Changes ({release.breaking.length})
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <ul className="space-y-2">
                          {release.breaking.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-red-900">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
