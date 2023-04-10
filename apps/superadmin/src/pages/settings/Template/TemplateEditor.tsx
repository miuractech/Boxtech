import { Badge, Button, Modal, Text, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDeviceFloppy, IconX } from '@tabler/icons';
import { environment } from '../../../environments/environment.prod';
import { RootState } from '../../../store/index';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import EmailEditor from 'react-email-editor';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { templates } from './AddTemplate';
import { useClipboard } from '@mantine/hooks';
import { db } from '../../../configs/firebaseconfig';


export const TemplateEditor = () => {

    const emailEditorRef = useRef<any>(null);
    const templateName = useLocation().pathname.split("/").pop()
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const { Templates } = useSelector((state: RootState) => state.templates)
    const clipboard = useClipboard({ timeout: 2000 });

    useEffect(() => {
        if (templateName) {
            // const name = decodeURIComponent(templateName)
            const find = templates.find(tem => tem.name === templateName)
            console.log(templateName);

            if (find?.name !== templateName) {
                navigate("/settings/mailtemplates")
            }
        }
    }, [])
    
    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data: any) => {
            emailEditorRef.current.editor.saveDesign(async (design: any) => {
                try {
                    if (!templateName) return
                    const { html } = data;
                    const findTem = templates.find(tem => tem.name === templateName)
                    if (!design) return
                    const docRef = doc(db, "emailTemplates", decodeURIComponent(templateName))
                    await setDoc(docRef, {
                        html: html,
                        subject: findTem?.subject,
                        updatedAt: serverTimestamp(),
                        design: JSON.stringify(design)
                    })
                    showNotification({
                        id: `reg-err-${Math.random()}`,
                        autoClose: 5000,
                        title: 'Success!',
                        message: `Template updated successfully - ${decodeURIComponent(templateName)}`,
                        color: 'green',
                        icon: <IconCheck />,
                        loading: false,
                    });
                    setModal(false)
                } catch (error: any) {
                    showNotification({
                        id: `reg-err-${Math.random()}`,
                        autoClose: 5000,
                        title: "Error!",
                        message: error.message,
                        color: "red",
                        icon: <IconX />,
                        loading: false,
                    });
                    setModal(false)
                }
            });
        });
    };

    if (templateName) {
        console.log(templates.find(tem => tem.name === templateName));
    } else {
        console.log("no template");

    }

    const onReady = () => {
        if (!templateName) return
        const findTemplate = Templates?.find((tem:any) => tem.id === decodeURIComponent(templateName))
        if (findTemplate) {
            const design = JSON.parse(findTemplate.design)
            console.log("ready",design);
            emailEditorRef.current.editor.loadDesign(design);
        }
    };

    return (
        <div>
            <div className='flex gap-10'>
                <Button onClick={() => {
                    if (!templateName)return
                    emailEditorRef.current.editor.exportHtml((data: any) => {
                        const { html } = data;
                        const findTem = templates.find(tem => tem.name === templateName)
                        const stringIncludes = findTem?.includes.every(inc => html.includes(inc));
                        if (!stringIncludes) {
                            showNotification({
                                id: `reg-err-${Math.random()}`,
                                autoClose: 5000,
                                title: "Error!",
                                message: `Templates dose not inclued ${findTem?.includes.map(a=>a)}`,
                                color: "red",
                                icon: <IconX />,
                                loading: false,
                            });
                        } else {
                            setModal(true)
                        }
                    })}}><IconDeviceFloppy /></Button>
                {templateName &&
                    <Text>This templates should include {templates.find(temp => temp.name === templateName)?.includes.map(inc => (
                    <Badge className='cursor-pointer active:bg-green-200' onClick={() => {
                        clipboard.copy(inc)
                        showNotification({
                            id: `reg-err-${Math.random()}`,
                            autoClose: 1500,
                            title: 'Success!',
                            message: "Copied to clipboard",
                            color: 'green',
                            icon: <IconCheck />,
                            loading: false,
                        });
                        }} color="cyan">{inc}</Badge>
                ))} </Text>}
            </div>
            <EmailEditor ref={emailEditorRef}  onReady={onReady} />
            <Modal opened={modal} onClose={() => setModal(false)}>
                <div className='space-y-10'>
                    <Title align='center' order={4}>Are you sure you want to save the changes</Title>
                    <div className='flex justify-center gap-5'>
                        <Button variant='outline'>Cancel</Button>
                        <Button onClick={exportHtml} className='w-24'>Save</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}