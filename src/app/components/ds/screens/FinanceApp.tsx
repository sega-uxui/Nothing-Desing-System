import { useState } from "react";
import {
  Home, Page, StatsReport, User, NavArrowDown, EyeClosed,
} from "iconoir-react";
import { Area, AreaChart, YAxis } from "recharts";

import { PhoneFrame } from "../../ui/phone-frame";
import { MobileStatusBar } from "../../ui/mobile-status-bar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { ListItem, ListItemGroup } from "../../ui/list-item";
import { NewsCard } from "../../ui/news-card";
import { SearchField } from "../../ui/search-field";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../../ui/chart";
import { Sparkline } from "../../ui/sparkline";
import { display } from "../Shared";
import { TICKERS, PORTFOLIO_DATA, RANGES, FINANCE_NEWS, FINANCE_MARKETS, type Range } from "./data";

const chartConfig: ChartConfig = {
  v: { label: "Portfolio", color: "var(--t-accent)" },
};

// ── Home tab ─────────────────────────────────────────────────────────
function FinanceHome() {
  const [q, setQ] = useState("");
  const [range, setRange] = useState<Range>("1D");
  const [chartView, setChartView] = useState("value");
  const [hideValue, setHideValue] = useState(false);

  return (
    <div className="px-4 pt-2 pb-4 space-y-4">
      <div className="flex items-center gap-2.5">
        <SearchField value={q} onChange={setQ} onClear={() => setQ("")} />
        <Badge
          className="flex-shrink-0 rounded-lg px-3 py-1.5 text-xs border-transparent"
          style={{ backgroundColor: "#F4C422", color: "#1A1000" }}
        >
          GOLD
        </Badge>
      </div>

      <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
        {TICKERS.map((ticker) => (
          <Card key={ticker.name} className="flex-shrink-0 w-24 gap-1 py-2.5 rounded-xl">
            <CardContent className="px-2.5 space-y-0.5">
              <div className="text-xs text-muted-foreground">{ticker.name}</div>
              <div className="-mx-1"><Sparkline data={ticker.data} /></div>
              <div className="text-xs text-foreground">{ticker.price}</div>
              <Badge variant="destructive" className="text-xs px-1.5 py-0">{ticker.change}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="h-auto py-1.5 px-3 rounded-full text-xs gap-1">
          All Holdings <NavArrowDown width={11} height={11} />
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="text-4xl leading-none" style={display}>
            {hideValue ? "● ● ● ● ●" : "$5,865.75"}
          </div>
          <div className="mt-2 space-y-0.5 text-sm">
            <div><span className="text-destructive">-27.75 (-0.47%)</span>{" "}<span className="text-muted-foreground">Day's Gain</span></div>
            <div><span className="text-destructive">-27.75 (-0.47%)</span>{" "}<span className="text-muted-foreground">Total Gain</span></div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="mt-1" onClick={() => setHideValue(!hideValue)}>
          <EyeClosed width={19} height={19} />
        </Button>
      </div>

      <ChartContainer config={chartConfig} className="aspect-auto h-[118px] w-full">
        <AreaChart data={PORTFOLIO_DATA} margin={{ top: 4, right: 6, bottom: 0, left: 6 }}>
          <defs>
            <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-v)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--color-v)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <YAxis hide domain={["dataMin - 15", "dataMax + 15"]} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Area
            type="monotone"
            dataKey="v"
            stroke="var(--color-v)"
            strokeWidth={1.8}
            fill="url(#portGrad)"
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ChartContainer>

      <ToggleGroup
        type="single"
        value={chartView}
        onValueChange={(v) => v && setChartView(v)}
        variant="outline"
        className="w-fit"
      >
        <ToggleGroupItem value="value" className="text-xs px-3">Value</ToggleGroupItem>
        <ToggleGroupItem value="return" className="text-xs px-3">Return</ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="single"
        value={range}
        onValueChange={(v) => v && setRange(v as Range)}
        className="w-full"
      >
        {RANGES.map((r) => (
          <ToggleGroupItem key={r} value={r} className="flex-1 text-xs rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
            {r}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl" style={display}>Lists</span>
        </div>
        <Card className="gap-1 py-3">
          <CardContent className="px-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">New list</span>
                <Badge variant="secondary" className="text-xs">Enhanced</Badge>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-sm text-foreground/80">$5,865.75</span>
              <span className="text-xs text-destructive">-27.75 (-0.47%)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── News tab ─────────────────────────────────────────────────────────
function FinanceNews() {
  return (
    <div className="px-4 pt-3 pb-4 space-y-3">
      {FINANCE_NEWS.map((n) => (
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

// ── Markets tab ──────────────────────────────────────────────────────
function FinanceMarkets() {
  const [segment, setSegment] = useState<keyof typeof FINANCE_MARKETS>("Stocks");
  const rows = FINANCE_MARKETS[segment];

  return (
    <div className="px-4 pt-3 space-y-3">
      <ToggleGroup
        type="single"
        value={segment}
        onValueChange={(v) => v && setSegment(v as keyof typeof FINANCE_MARKETS)}
        variant="outline"
        className="w-full"
      >
        {(Object.keys(FINANCE_MARKETS) as (keyof typeof FINANCE_MARKETS)[]).map((s) => (
          <ToggleGroupItem key={s} value={s} className="flex-1 text-xs">{s}</ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ListItemGroup>
        {rows.map((r) => (
          <ListItem
            key={r.name}
            title={r.name}
            subtitle={r.price}
            trailing={
              <>
                <Sparkline data={r.data as any} variant={r.change.startsWith("+") ? "up" : "down"} />
                <Badge variant={r.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
                  {r.change}
                </Badge>
              </>
            }
            onClick={() => {}}
          />
        ))}
      </ListItemGroup>
    </div>
  );
}

// ── Account tab ──────────────────────────────────────────────────────
function FinanceAccount() {
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm">Jordan Diaz</div>
          <div className="text-xs text-muted-foreground">jordan.diaz@email.com</div>
        </div>
      </div>

      <Separator />

      <ListItemGroup>
        <ListItem
          title="Notifications"
          subtitle="Price alerts and account activity"
          trailing={<Switch checked={notifs} onCheckedChange={setNotifs} />}
        />
        <ListItem title="Security" subtitle="Password, 2FA, and login activity" onClick={() => {}} />
        <ListItem title="Payment Methods" subtitle="Linked bank accounts and cards" onClick={() => {}} />
        <ListItem title="Linked Accounts" subtitle="Connect brokerage and bank data" onClick={() => {}} />
        <ListItem
          title="Appearance"
          subtitle="Theme used across the app"
          trailing={<Badge variant="secondary" className="text-xs">Light</Badge>}
          onClick={() => {}}
        />
      </ListItemGroup>

      <Button variant="outline" className="w-full">Sign Out</Button>
    </div>
  );
}

// ── Finance app shell ────────────────────────────────────────────────
export function FinanceScreen() {
  const [tab, setTab] = useState("home");

  return (
    <PhoneFrame>
      <MobileStatusBar />
      <Tabs value={tab} onValueChange={setTab} className="flex-1 min-h-0 gap-0">
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
          <TabsContent value="home" className="mt-0"><FinanceHome /></TabsContent>
          <TabsContent value="news" className="mt-0 h-full"><FinanceNews /></TabsContent>
          <TabsContent value="markets" className="mt-0 h-full"><FinanceMarkets /></TabsContent>
          <TabsContent value="account" className="mt-0 h-full"><FinanceAccount /></TabsContent>
        </div>
        <TabsList className="w-full flex-shrink-0 flex bg-transparent border-t justify-around h-auto p-0 rounded-none py-2">
          {[
            { value: "home", Icon: Home, label: "Home" },
            { value: "news", Icon: Page, label: "News" },
            { value: "markets", Icon: StatsReport, label: "Markets" },
            { value: "account", Icon: User, label: "Account" },
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
