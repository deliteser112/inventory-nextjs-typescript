import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Product, InventoryChange } from "../../types/product";

type ProductChange = InventoryChange & {
  changeType: string;
  description?: string;
};

// Group changes by date
const groupChangesByDate = (changes: ProductChange[]) => {
  return changes.reduce((acc, change) => {
    const date = new Date(change.date).toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(change);
    return acc;
  }, {} as Record<string, ProductChange[]>);
};

const ProductHistory: React.FC<{ product: Product }> = ({ product }) => {
  const historyItems: ProductChange[] = product.inventoryChanges || [];
  const groupedChanges = groupChangesByDate(historyItems);

  return (
    <Timeline>
      {Object.entries(groupedChanges).map(([date, changes], index) => (
        <TimelineItem
          key={index}
          sx={{ "&.MuiTimelineItem-root::before": { display: "none" } }}
        >
          <TimelineSeparator>
            <TimelineDot />
            {index < Object.entries(groupedChanges).length - 1 && (
              <TimelineConnector />
            )}
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="body2"
              sx={{ color: "#7A7A7A", marginBottom: 1 }}
            >
              {date}
            </Typography>
            {changes.map((change, i) => {
              // Convert description back to array if it contains multiple changes
              const descriptions = change.description?.split("; ");
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Avatar
                    src="/images/user.jpg"
                    alt={change.changedBy}
                    sx={{ width: 40, height: 40, marginRight: "16px" }}
                  />
                  <Box>
                    {descriptions && descriptions.length > 1 ? (
                      <>
                        <Typography
                          variant="body1"
                          sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                        >
                          Multiple changes:
                        </Typography>
                        <ul
                          style={{
                            paddingLeft: "16px",
                            marginTop: 0,
                            color: "#FFFFFF",
                          }}
                        >
                          {descriptions.map((desc, j) => (
                            <li key={j}>
                              <Typography
                                variant="caption"
                                sx={{ color: "#FFFFFF" }}
                              >
                                {desc}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                        {change.changeType === "adjustment"
                          ? `Adjusted stock to ${change.newQuantity}`
                          : change.description || "Product edited"}
                      </Typography>
                    )}
                    <Typography variant="caption" sx={{ color: "#7A7A7A" }}>
                      {change.changedBy}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default ProductHistory;
