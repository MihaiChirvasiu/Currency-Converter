package com.example.currencyconverter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.money.Monetary;
import javax.money.MonetaryAmount;
import javax.money.convert.CurrencyConversion;
import javax.money.convert.MonetaryConversions;
import java.util.Currency;
import java.util.Locale;

@RestController
@CrossOrigin(origins = "*")
public class ConverterController {

    @Autowired
    public ConverterController(){

    }

    @RequestMapping(value = "/greeting", method = RequestMethod.GET)
    ResponseEntity<?> greeting(){
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("Hello");
    }

    @GetMapping(value = "/currencies")
    ResponseEntity<?> getCurrencies(){
        System.out.println("HEy");
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(Currency.getAvailableCurrencies());
    }

    @PostMapping(value = "/convert")
    ResponseEntity<?> amountToFrom(@RequestParam String from, @RequestParam String to, @RequestParam Double amount){
        MonetaryAmount monetaryFrom = Monetary.getDefaultAmountFactory().setCurrency(from).setNumber(amount).create();
        CurrencyConversion conversionTo = MonetaryConversions.getConversion(to);
        MonetaryAmount converted = monetaryFrom.with(conversionTo);

        return new ResponseEntity<>(converted.getNumber().doubleValue(), HttpStatusCode.valueOf(200));
    }
}
