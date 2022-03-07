package com.example.fidobiznesserver.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FormDoc {
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
    private Integer  deliveryTypeId;
    private Integer docSenderId;
    private Integer attchmentId;

    public FormDoc(boolean access, Date expireDate, Date regDate, Date sendDate, boolean cardControl, String regNum, String sendDocNum, String someReference, String theme, int deliveryTypeId, int docSenderId, Integer attchmentId) {
        this.access = access;
        this.expireDate = expireDate;
        this.regDate = regDate;
        this.sendDate = sendDate;
        this.cardControl = cardControl;
        this.regNum = regNum;
        this.sendDocNum = sendDocNum;
        this.someReference = someReference;
        this.theme = theme;
        this.deliveryTypeId = deliveryTypeId;
        this.docSenderId = docSenderId;
        this.attchmentId = attchmentId;
    }
}
