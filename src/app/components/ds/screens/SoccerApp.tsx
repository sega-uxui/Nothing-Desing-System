import { useState } from "react";
import { FootballBall, Page, Trophy, Star, MoreHoriz } from "iconoir-react";

import { PhoneFrame } from "../../ui/phone-frame";
import { MobileStatusBar } from "../../ui/mobile-status-bar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../ui/table";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Switch } from "../../ui/switch";
import { ListItem, ListItemGroup } from "../../ui/list-item";
import { NewsCard } from "../../ui/news-card";
import { SoccerMatch } from "./SoccerMatch";
import { SOCCER_NEWS, LEAGUE_STANDINGS, FOLLOWING } from "./data";

// ── News tab ─────────────────────────────────────────────────────────
function SoccerNews() {
  return (
    <div className="px-4 pt-3 pb-4 space-y-3">
      {SOCCER_NEWS.map((n) => (
        <NewsCard
          key={n.title}
          image={n.image}
          title={n.title}
          source={n.source}
          time={n.time}
          tag={n.tag}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}

// ── Leagues tab ──────────────────────────────────────────────────────
function SoccerLeagues() {
  return (
    <div className="px-4 pt-3 pb-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
        MLS · Western Conference
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8 px-1">#</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right px-1">P</TableHead>
            <TableHead className="text-right px-1">GD</TableHead>
            <TableHead className="text-right px-1">Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LEAGUE_STANDINGS.map((r) => (
            <TableRow key={r.team} className={r.highlight ? "bg-accent" : undefined}>
              <TableCell className={`px-1 text-xs ${r.highlight ? "font-semibold text-[var(--t-accent)]" : ""}`}>{r.pos}</TableCell>
              <TableCell className={`text-xs ${r.highlight ? "font-semibold text-[var(--t-accent)]" : ""}`}>{r.team}</TableCell>
              <TableCell className="text-right px-1 text-xs tabular-nums">{r.p}</TableCell>
              <TableCell className="text-right px-1 text-xs tabular-nums">{r.gd > 0 ? `+${r.gd}` : r.gd}</TableCell>
              <TableCell className="text-right px-1 text-xs tabular-nums font-medium">{r.pts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ── Following tab ────────────────────────────────────────────────────
function SoccerFollowing() {
  return (
    <ListItemGroup className="px-4 pt-3">
      {FOLLOWING.map((f) => (
        <ListItem
          key={f.name}
          leading={
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">{f.initials}</AvatarFallback>
            </Avatar>
          }
          title={f.name}
          subtitle={f.meta}
          trailing={<Button size="sm" variant="outline" className="text-xs h-7">Following</Button>}
        />
      ))}
    </ListItemGroup>
  );
}

// ── More tab ─────────────────────────────────────────────────────────
function SoccerMore() {
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <ListItemGroup>
        <ListItem
          title="Notifications"
          subtitle="Goals, lineups, and match reminders"
          trailing={<Switch checked={notifs} onCheckedChange={setNotifs} />}
        />
        <ListItem title="Language" subtitle="English (US)" onClick={() => {}} />
        <ListItem title="Help & Support" subtitle="FAQs and contact options" onClick={() => {}} />
        <ListItem title="About" subtitle="Version 4.2.1" onClick={() => {}} />
      </ListItemGroup>
      <Button variant="outline" className="w-full">Sign Out</Button>
    </div>
  );
}

// ── Soccer app shell ─────────────────────────────────────────────────
export function SoccerScreen() {
  const [tab, setTab] = useState("matches");

  return (
    <PhoneFrame>
      <MobileStatusBar />
      <Tabs value={tab} onValueChange={setTab} className="flex-1 min-h-0 gap-0">
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <TabsContent value="matches" className="mt-0 h-full flex flex-col"><SoccerMatch /></TabsContent>
          <TabsContent value="news" className="mt-0"><SoccerNews /></TabsContent>
          <TabsContent value="leagues" className="mt-0"><SoccerLeagues /></TabsContent>
          <TabsContent value="following" className="mt-0"><SoccerFollowing /></TabsContent>
          <TabsContent value="more" className="mt-0"><SoccerMore /></TabsContent>
        </div>
        <TabsList className="w-full flex-shrink-0 flex bg-transparent border-t justify-around h-auto p-0 rounded-none py-2">
          {[
            { value: "matches", Icon: FootballBall, label: "Matches" },
            { value: "news", Icon: Page, label: "News" },
            { value: "leagues", Icon: Trophy, label: "Leagues" },
            { value: "following", Icon: Star, label: "Following" },
            { value: "more", Icon: MoreHoriz, label: "More" },
          ].map(({ value, Icon, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex-col gap-0.5 h-auto py-1 rounded-none text-muted-foreground data-[state=active]:text-[var(--t-accent)] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Icon width={22} height={22} />
              <span className="text-xs">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </PhoneFrame>
  );
}
