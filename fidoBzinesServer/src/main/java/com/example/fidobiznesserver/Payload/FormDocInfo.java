package com.example.fidobiznesserver.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormDocInfo {
    private int id;
    private boolean access;
    private Date expireDate;
    private Date regDate;
    private Date sendDate;
    private boolean cardControl;
    private String regNum;
    private String sendDocNum;
    private String someReference;
    private String theme;
    private int attachmentId;
    private String  deliveryType;
    private String senderName;
}
