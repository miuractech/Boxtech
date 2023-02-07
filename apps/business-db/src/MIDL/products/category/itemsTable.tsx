import {
  Button,
  Modal,
  Text,
  Title,
  Divider,
  LoadingOverlay,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AddButton } from '../../../utils/AddButton';
import React, { useState, useEffect } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import _ from 'lodash';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';
import { environment } from '../../../environments/environment.prod';
import { categoryRef, defaultErrorMessage } from '../../../constants';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '../../../configs/firebaseconfig';
import { AddItems } from './AddItems';
import { ItemComponent } from './ItemComponent';
import { CatergoryType } from '@boxtech/shared-constants';
type Props = {
  section: string;
  isReodrded: boolean;
  setIsReodrded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemsTable({
  section,
  isReodrded,
  setIsReodrded,
}: Props) {
  const mediaQuery = useMediaQuery('(min-width: 640px)');

  const { category } = useSelector((state: RootState) => state.category);
  const [modal, setModal] = useState(false);
  const [newData, setNewData] = useState<CatergoryType[] | undefined>(
    undefined
  );
  const [editDetails, setEditDetails] = useState<null | CatergoryType>(null);
  useEffect(() => {
    const targetCategory = category?.filter((cat) => cat.Category === section);
    const result = _.orderBy(targetCategory, 'index', 'asc');
    console.log(result);
    setNewData(result);
  }, [section, category]);

  const onDragEnd = (data: DropResult) => {
    const { destination, source } = data;
    if (!destination || !newData) return;
    if (destination.index === source.index) return;
    const finalResult = Array.from(newData); // we are copying the branches to a new variable for manipulation.
    const [removed] = finalResult.splice(source.index, 1);
    finalResult.splice(destination.index, 0, removed);
    const result = finalResult.map((cat: any, index) => ({ ...cat, index }));
    setIsReodrded(true);
    setNewData(result);
  };

  const saveChanges = async () => {
    if (newData) {
      try {
        const batch = writeBatch(db);
        newData.forEach((cat: CatergoryType) => {
          const docRef = doc(categoryRef, cat.id);
          batch.update(docRef, {
            index: cat.index,
          });
        });
        await batch.commit();
        setIsReodrded(false);
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Success!',
          message: 'Branches updated successfully',
          color: 'green',
          icon: <IconCheck />,
          loading: false,
        });
      } catch (error: any) {
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Not Authorised!',
          message: environment.production ? defaultErrorMessage : error.message,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
      }
    }
  };

  const edit = (id: string) => {
    setModal(true);
    const findItem = category?.find((item) => item.id === id);
    if (!findItem) return;
    setEditDetails(findItem);
  };
  if (newData === undefined) return <LoadingOverlay visible={true} />;
  return (
    <div className="pt-5 sm:p-5 bg-white sm:mb-5 relative rounded-2xl min-h-[70vh]">
      <div className="grid grid-cols-3">
        <div> </div>
        <Title
          className="self-center text-sm sm:text-xl"
          align="center"
          color="#0A2540"
          order={3}
        >
          {/* Items */}
        </Title>
        <div className="justify-self-center">
          <AddButton
            size={!mediaQuery ? 'xs' : 'md'}
            onClick={() => {
              setModal(true);
            }}
            icon={true}
            text={!mediaQuery ? 'Add' : 'Add Items'}
            disabled={isReodrded}
          />
        </div>
      </div>

      {isReodrded && (
        <div className="text-center space-y-3 left-[40%] -top-5 w-[200px] m-auto bg-white">
          <Text>Save Changes</Text>
          <div className="flex gap-5 justify-center">
            <AddButton
              onClick={saveChanges}
              style={{ width: '80px' }}
              text="Save"
            />
            <Button
              variant="outline"
              onClick={() => {
                if (!category) return;
                setIsReodrded(false);
                const targetCategory = category.filter(
                  (cat) => cat.Category === section
                );
                setNewData(targetCategory);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div>
        <div className="p-3 flex gap-3 bg-white items-center font-bold border-b">
          <div className="w-10" />
          <div className="grow text-left">Items</div>
          <div className="w-28 text-left hidden sm:block">Dimension</div>
          <div className="text-left w-16 md:w-32">
            <span className="md:inline-block hidden">Storage </span> Price
          </div>
          <div className="text-left w-20 md:w-[200px]">Action</div>
        </div>
        <Divider size="xs" />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="Items List">
            {(provided: DroppableProvided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {newData.length > 0 ? (
                  newData.map((data) => {
                    return (
                      <Draggable
                        key={data.id}
                        draggableId={data.id}
                        index={data.index}
                      >
                        {(provided: DraggableProvided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <ItemComponent
                              dragProps={{ ...provided.dragHandleProps }}
                              edit={edit}
                              key={data.id}
                              cat={data}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                ) : (
                  <div className="p-5">
                    <div></div>
                    <div>No data</div>
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal
        opened={modal}
        transition="slide-down"
        onClose={() => {
          setModal(false);
          setEditDetails(null);
        }}
      >
        <AddItems
          editDetails={editDetails}
          activeTab={section}
          setModal={setModal}
        />
      </Modal>
    </div>
  );
}
