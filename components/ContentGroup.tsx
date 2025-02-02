import { ListData } from "../services/data";
import { Group, Modal, Text } from "@mantine/core";
import Image from "next/image";
import { ItemContent } from "./ItemContent";
import React, { useState } from "react";
import { DefaultProps } from "@mantine/styles";
import { Item } from "../repositories/item";

interface Props extends DefaultProps {
  group: Item[];
  lists: ListData[];
}

export const ContentGroup = ({ group, lists }: Props) => {
  const [selected, setSelected] = useState<Item>({} as Item);

  const onItemSelected = (item: Item) => {
    if (selected.id === item.id) {
      return onResetSelection();
    }
    setSelected(item);
  };

  const onResetSelection = () => {
    setSelected({} as Item);
  };

  return (
    <>
      <Group position="center">
        {group.map((item) => {
          const uid = `${item.id}-${item.subject_slug}-${item.list_id}`;
          const list =
            lists.find((list) => list.id === item.list_id) || ({} as ListData);
          return (
            <Group
              key={uid}
              style={{
                display: "list-item",
                listStyle: "none",
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  height: 80,
                  width: 80,
                }}
              >
                <Image
                  src={`/symbols/${list.symbol_name}`}
                  alt={list.list}
                  title={list.list}
                  width="64"
                  height="64"
                />
              </div>
              <ItemContent
                item={item}
                selected={selected.id === item.id}
                onItemSelected={onItemSelected}
              />
            </Group>
          );
        })}
      </Group>
      <Modal
        opened={!!selected.id}
        onClose={onResetSelection}
        title={selected.list}
        style={{
          zIndex: 3000,
        }}
      >
        <Text>{selected.source?.content}</Text>
        {selected.source?.url ? (
          <Text
            size={"sm"}
            style={{
              marginTop: 30,
              marginLeft: "auto",
              textAlign: "right",
            }}
          >
            {
              <a
                href={selected.source?.url}
                target={"_blank"}
                rel={"noreferrer"}
                style={{
                  textDecoration: "underline",
                }}
              >
                {selected.source.title}
              </a>
            }
          </Text>
        ) : null}
      </Modal>
    </>
  );
};
