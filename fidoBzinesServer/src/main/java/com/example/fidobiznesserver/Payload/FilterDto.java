package com.example.fidobiznesserver.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FilterDto {
    private String theme;
    private String regNum;
    private Date regDateStart;
    private Date regDateEnd;
    private Date sendDateStart;
    private Date sendDateEnd;
    private String sendDocNum;
    private int correspondentId;
    private int deliveryTypeId;
    private String someReference;


}
