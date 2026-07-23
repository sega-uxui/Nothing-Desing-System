import { useState } from "react";
import { Building, MapPin, Community, CloudSunny } from "iconoir-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { ListItem, ListItemGroup } from "../../ui/list-item";
import { CompareBar } from "../../ui/compare-bar";
import { display } from "../Shared";
import {
  SoundersLogo, MinnesotaLogo, PLAYER_IMG,
  COMMENTARY, HOME_XI, AWAY_XI, KNOCKOUT_ROUNDS, MATCH_STATS,
} from "./data";

const MATCH_TABS = ["Preview", "Commentary", "Lineup", "Knockout", "Stats"] as const;

function MatchHeader() {
  return (
    <div className="px-4 pt-1 pb-3 flex-shrink-0">
      <div className="flex justify-center mb-3">
        <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">2nd leg</Badge>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-center gap-1.5 w-20">
          <SoundersLogo size={50} />
          <span className="text-xs text-foreground/80 text-center leading-tight">Seattle Sounders</span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <span className="text-4xl leading-[1.05] tracking-tighter" style={display}>
            10:45 AM
          </span>
          <span className="text-xs text-muted-foreground mt-1 tracking-wide">00:11:27</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 w-20">
          <MinnesotaLogo size={50} />
          <span className="text-xs text-foreground/80 text-center leading-tight">Minnesota</span>
        </div>
      </div>
    </div>
  );
}

// ── Preview tab ──────────────────────────────────────────────────────
function MatchPreview() {
  const [vote, setVote] = useState<string | undefined>();

  return (
    <div className="px-4 pt-3 space-y-3">
      <Card className="gap-3 py-4">
        <CardContent className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Who will win?</span>
            <span className="text-xs text-muted-foreground">Total votes: 12,079</span>
          </div>
          <ToggleGroup type="single" value={vote} onValueChange={(v) => setVote(v)} className="w-full gap-2" variant="outline">
            <ToggleGroupItem value="home" className="flex-1 rounded-xl border h-auto py-3 data-[state=on]:bg-[rgba(46,125,50,0.07)] data-[state=on]:border-[#2E7D32]">
              <SoundersLogo size={28} />
            </ToggleGroupItem>
            <ToggleGroupItem value="draw" className="flex-1 rounded-xl border h-auto py-3 text-sm">
              Draw
            </ToggleGroupItem>
            <ToggleGroupItem value="away" className="flex-1 rounded-xl border h-auto py-3 data-[state=on]:bg-[rgba(20,33,61,0.06)] data-[state=on]:border-[#14213D]">
              <MinnesotaLogo size={28} />
            </ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>

      <Card className="py-0 gap-0 overflow-hidden">
        <div className="flex">
          <img src={PLAYER_IMG} alt="Match news" className="object-cover flex-shrink-0 w-28 h-24" />
          <div className="flex-1 p-3">
            <p className="text-xs leading-relaxed">Rusnak confident Sounders can use home advantage in Game 2</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#2E7D32" }}>
                <span className="text-xs text-white font-bold">F</span>
              </div>
              <span className="text-xs text-muted-foreground">FotMob · Yesterday</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="gap-0 py-0">
        <CardContent className="px-3.5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building width={17} height={17} className="text-foreground/70 flex-shrink-0" />
            <div>
              <div className="text-sm">Lumen Field</div>
              <div className="text-xs text-muted-foreground">Seattle, Washington, United States</div>
            </div>
          </div>
          <MapPin width={18} height={18} className="text-[var(--ds-color-success)] flex-shrink-0" />
        </CardContent>
        <Separator />
        <CardContent className="px-3.5 py-2.5 flex items-center gap-2 text-xs">
          <Community width={15} height={15} className="text-foreground/70 flex-shrink-0" />
          <span className="text-foreground/70">Capacity</span>
          <span>72,000</span>
          <span className="text-muted-foreground mx-1">·</span>
          <span className="text-foreground/70">Surface</span>
          <span>Artificial</span>
        </CardContent>
        <Separator />
        <CardContent className="px-3.5 py-2.5 flex items-center gap-2 text-xs">
          <CloudSunny width={15} height={15} className="text-foreground/70 flex-shrink-0" />
          <span className="text-foreground/70">Forecast</span>
          <span className="text-sm">46°</span>
          <span className="text-foreground/70">Cloudy</span>
        </CardContent>
      </Card>

      <Card className="gap-0 py-3 bg-black border-black">
        <CardContent className="px-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-neutral-900 border border-neutral-700">
              <span className="text-white text-sm font-bold">tv</span>
            </div>
            <span className="text-sm text-white">Watch on Apple TV</span>
          </div>
          <span className="text-sm" style={{ color: "var(--ds-color-success)" }}>Subscribe now</span>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Commentary tab ───────────────────────────────────────────────────
function MatchCommentary() {
  const kindVariant = (kind: string) =>
    kind === "Goal" ? "default" : kind === "Card" ? "destructive" : "secondary";

  return (
    <ListItemGroup className="px-4">
      {COMMENTARY.map((c, i) => (
        <ListItem
          key={i}
          leading={<Badge variant={kindVariant(c.kind)} className="text-xs tabular-nums">{c.minute}</Badge>}
          title={c.text}
          subtitle={c.player}
        />
      ))}
    </ListItemGroup>
  );
}

// ── Lineup tab ───────────────────────────────────────────────────────
function MatchLineup() {
  return (
    <div className="px-4 pt-3 pb-4 space-y-3">
      <Card className="gap-2 py-3">
        <CardContent className="px-3">
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Seattle Sounders</div>
          <ListItemGroup>
            {HOME_XI.map((p) => (
              <ListItem
                key={p.num}
                leading={<Badge variant="secondary" className="text-xs w-6 justify-center">{p.num}</Badge>}
                title={p.name}
                subtitle={p.pos}
              />
            ))}
          </ListItemGroup>
        </CardContent>
      </Card>
      <Card className="gap-2 py-3">
        <CardContent className="px-3">
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Minnesota United</div>
          <ListItemGroup>
            {AWAY_XI.map((p) => (
              <ListItem
                key={p.num}
                leading={<Badge variant="secondary" className="text-xs w-6 justify-center">{p.num}</Badge>}
                title={p.name}
                subtitle={p.pos}
              />
            ))}
          </ListItemGroup>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Knockout tab ─────────────────────────────────────────────────────
function MatchKnockout() {
  return (
    <div className="px-4 pt-3 pb-4 space-y-3">
      {KNOCKOUT_ROUNDS.map((r) => (
        <Card key={r.round} className="gap-2 py-3">
          <CardContent className="px-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{r.round}</div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={r.winner === "home" ? "text-sm" : "text-sm text-muted-foreground"}>{r.home}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm tabular-nums">{r.homeScore}</span>
                  {r.winner === "home" && <Badge className="text-xs px-1.5">W</Badge>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={r.winner === "away" ? "text-sm" : "text-sm text-muted-foreground"}>{r.away}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm tabular-nums">{r.awayScore}</span>
                  {r.winner === "away" && <Badge className="text-xs px-1.5">W</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── Stats tab ────────────────────────────────────────────────────────
function MatchStats() {
  return (
    <div className="px-4 pt-3 pb-4">
      <Card className="py-4">
        <CardContent className="px-4 space-y-5">
          {MATCH_STATS.map((s) => (
            <CompareBar
              key={s.label}
              label={s.label}
              leftValue={s.left}
              rightValue={s.right}
              leftLabel={s.leftLabel}
              rightLabel={s.rightLabel}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function SoccerMatch() {
  const [tab, setTab] = useState<string>("Preview");

  return (
    <Tabs value={tab} onValueChange={setTab} className="flex-1 min-h-0 gap-0">
      <MatchHeader />
      <TabsList className="flex-shrink-0 flex-nowrap justify-start overflow-x-auto no-scrollbar bg-transparent border-b rounded-none h-auto p-0 w-full">
        {MATCH_TABS.map((t) => (
          <TabsTrigger
            key={t}
            value={t}
            className="flex-shrink-0 rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm text-muted-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none whitespace-nowrap"
          >
            {t}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <TabsContent value="Preview" className="mt-0 pt-3"><MatchPreview /></TabsContent>
        <TabsContent value="Commentary" className="mt-0 pt-3"><MatchCommentary /></TabsContent>
        <TabsContent value="Lineup" className="mt-0"><MatchLineup /></TabsContent>
        <TabsContent value="Knockout" className="mt-0"><MatchKnockout /></TabsContent>
        <TabsContent value="Stats" className="mt-0"><MatchStats /></TabsContent>
      </div>
    </Tabs>
  );
}
